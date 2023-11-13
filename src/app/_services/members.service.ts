import { UserParams } from 'src/app/_models/userParams';
import { Member } from './../_models/member';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { map, of, Observable, take } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';
import { AccountService } from './account.service';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];
  memberCache = new Map();
  userParams: UserParams;
  user: User;

  constructor(private http:HttpClient,private accountService: AccountService) {
    // тут делаем так чтобы фильтры после перехода на страницу пользователя не сбрасывались а сохранялись
    this.accountService.currenUser$.pipe(take(1)).subscribe(user=>{
      this.user = user;
      this.userParams = new UserParams(user);
   })
  }

  getUserParams(){
    return this.userParams;
  }

  setUserParams(params: UserParams){
    this.userParams = params;
  }

  resetUserParams(){
    this.userParams = new UserParams(this.user);
    return this.userParams;
  }

  addLike(userName: string){
    return this.http.post(this.baseUrl + 'likes/' + userName , {});
  }

  getLikes(predicate : string,pageNumber,pageSize){
    let params = this.getPaginationHeaders(pageNumber,pageSize);
    params = params.append('predicate',predicate);
    return this.getPaginationResult<Partial<Member[]>>(this.baseUrl + 'likes' , params);
  }

  getMembers(userParams: UserParams){
    // кеширование , если ответ есть то возвращаем кеширование
    var responce = this.memberCache.get(Object.values(userParams).join('-'));
    if(responce){
      return of(responce);
    }
    // передаем номер страцниы и размер элементов на странице
    let params = this.getPaginationHeaders(userParams.pageNumber,userParams.pageSize);

    params = params.append('minAge',userParams.minAge.toString());
    params = params.append('maxAge',userParams.maxAge.toString());
    params = params.append('gender',userParams.gender);
    params = params.append('orderBy',userParams.orderBy);

    return this.getPaginationResult<Member[]>(this.baseUrl + 'users',params)
      .pipe(map(responce=>{
        // получаем ответ от API и смотрим если ответ равен то берем кеш иначе кеш Add
        this.memberCache.set(Object.values(userParams).join('-'),responce);
        return responce;
      }));
  }

 private getPaginationResult<T>(url,params){

  const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
  console.log(params);
  return this.http.get<T>(url,{observe: 'response',params}).pipe(
    map(responce=>{
      paginatedResult.result = responce.body;
      if(responce.headers.get('Pagination') !== null){

        paginatedResult.pagination = JSON.parse(responce.headers.get('Pagination'));
      }
      return paginatedResult;
    })
  );
  }

  private getPaginationHeaders(pageNumber: number,pageSize:number){
    let params = new HttpParams();
    params = params.append('pageNumber',pageNumber.toString());
    params = params.append('pageSize',pageSize.toString());

    return params;
  }

  getMember(userName:string){
    // грузим в кеш отдельного пользователя когда нажимаем просмотреть его инфомрацию
    // используем функцию обратного вызова и если есть совпадение то грузим из кеша
    const member = [...this.memberCache.values()]
                                    .reduce((arr,element)=> arr.concat(element.result),[])
                                    .find((member:Member)=>member.userName == userName);

    if(member){
      return of(member);
    }

    return this.http.get<Member>(this.baseUrl + 'users/' + userName);
  }

  updateMember(member:Member){
    return this.http.put(this.baseUrl + 'users',member).pipe(
      map(()=>{
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    );
  }
}

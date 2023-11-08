import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory:string[] = [];
  private apiKey : string = 'Cu0pPacxezqK9bAvWZ0PkARs1DVuSxPj';
  private serviceURL : string ='http://api.giphy.com/v1/gifs';

  constructor(private http : HttpClient) { }

  get tagsHistory(){
    return [...this._tagsHistory];
  }

  private organizeHistory(tag:string){
    tag = tag.toLowerCase();

    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }

    this._tagsHistory.unshift(tag);

    this._tagsHistory = this._tagsHistory.splice(0,10);

  }

  searchTag(tag:string):void{

    if(tag.length === 0) return;

    this.organizeHistory(tag);

    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', '10')
    .set('q', tag);


    this.http.get<SearchResponse>(`${this.serviceURL}/search`,{params})
    .subscribe( resp => {
      this.gifList = resp.data;
    })


  }

}

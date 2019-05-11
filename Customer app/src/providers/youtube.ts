import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Interfaces
import { YouTubeAPIRequest } from '../interfaces/youtube.interfaces';
import 'rxjs/add/operator/toPromise';

const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/';
const YOUTUBE_API_KEY = 'AIzaSyBE4a6zhwT1t9qOfCroofN0Tu8z2RWqw6Y';  //Get the google map api key form console.google.com
const REGION_CODE     = 'FR';

@Injectable()
export class YoutubeProvider {

  constructor(public http: HttpClient) {
    console.log('Hello YoutubeProvider Provider');
  }

  /**
   * fetchCategories
   */
  public fetchCategories(): Promise<YouTubeAPIRequest> {
    return this.http.get(`${YOUTUBE_API_URL}videoCategories?part=snippet&regionCode=${REGION_CODE}&key=${YOUTUBE_API_KEY}`)
    .toPromise()
    .then((response: YouTubeAPIRequest) => {
      return response;
    });
  }
  
  /**
   * searchVideos
   */
  public searchVideos(categoryId: number = 1): Promise<YouTubeAPIRequest> {
    return this.http.get(`${YOUTUBE_API_URL}search?part=snippet&videoCategoryId=${categoryId}&key=${YOUTUBE_API_KEY}&maxResults=10&type=video`)
    .toPromise()
    .then((response: YouTubeAPIRequest) => {
      return response;
    });
  }

  /**
   * searchTrandingVideos
   */
  public searchTrandingVideos(): Promise<YouTubeAPIRequest> {
    return this.http.get(`${YOUTUBE_API_URL}videos?part=snippet&chart=mostPopular&key=${YOUTUBE_API_KEY}&regionCode=${REGION_CODE}&maxResults=10`)
    .toPromise()
    .then((response: YouTubeAPIRequest) => {
      return response;
    });
  }

}
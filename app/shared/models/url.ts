
export class Url{

  index: number = 0;
  clicks: number = 0;
  shortUrl: string = '';
  longUrl: string = '';

  constructor(data: any) {
    if(data.index){
      this.index = data.index;
    }
    if(data.clicks){
      this.clicks = data.clicks;
    }
    if(data.shortUrl){
      this.shortUrl = data.shortUrl;
    }
    if(data.longUrl){
      this.longUrl = data.longUrl;
    }
  }
}

export class EarlyAccess {
 email: string;
  type: string;

  constructor(data: any) {
    if(data.email){
      this.email = data.email;
    }
    if(data.type){
      this.type = data.type;
    }
  }

}

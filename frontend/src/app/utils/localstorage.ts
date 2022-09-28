export class LocalStorageUtils {

    public getUser(){
        return JSON.parse(localStorage.getItem('user')!);
    }

    public saveDataUserLocalStorage(response:any){
        this.saveToken(response.token);
        this.saveUsers(response.data);
        this.saveExpires(response.expires);
    }
    
    public clearData(){
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('expires');
    }

    public getToken(): string | null{
        return localStorage.getItem('token');
    }

    public saveToken(token: string){
        localStorage.setItem('token',token);
    }

    public saveUsers(user: object){
        localStorage.setItem('user',JSON.stringify(user));
    }

    public saveExpires(expires: string){
        localStorage.setItem('expires',expires);
    }

}
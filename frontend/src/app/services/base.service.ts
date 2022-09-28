import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalStorageUtils } from '../utils/localstorage';

export abstract class BaseService {

    public LocalStorage = new LocalStorageUtils();

    protected api_url: string = environment.url_base_api;
    protected api_url_files: string = environment.url_base_files;
    protected GetHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
    }

    protected extractData(response: any) {
        return response || {};
    }

    public getToken(): string | null {
        return this.LocalStorage.getToken();
    }

    public getUser() {
        return this.LocalStorage.getUser();
    }

    protected serviceError(response: Response | any) {
        let customError: string[] = [];

        if (response instanceof HttpErrorResponse) {
            if (response.statusText === "Unknown Error") {
                customError.push("Ocorreu um erro desconhecido!");
                response.error.errors = customError;
            }
        }
        console.error(response);
        return throwError(response);
    }

    protected getAuthHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'x-access-token': `${this.LocalStorage.getToken()}`
            })
        };
    }

}
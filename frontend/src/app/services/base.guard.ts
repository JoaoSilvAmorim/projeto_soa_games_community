import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { LocalStorageUtils } from '../utils/localstorage';

export abstract class BaseGuard {

    private localStorageUtils = new LocalStorageUtils();

    constructor(protected router: Router) { }

    canActivate(route: ActivatedRouteSnapshot): boolean {

        if(!this.localStorageUtils.getToken()) {
            this.router.navigate(['/'], { queryParams: { returnUrl: route.url } });
            return false;
        }

        let provider = this.localStorageUtils.getProvider();
        
        let claim: any = route.data[0];
        if (claim !== undefined) {
            let claim = route.data[0]['claim'];

            if (claim) {
                if (!provider.claims) {
                    this.accessDenied();
                }
                
                let providerClaims = provider.claims.find((x:any) => x.type === claim.name);
                
                if(!providerClaims){
                    this.accessDenied();
                }
                
                let valuesClaim = providerClaims.value as string;

                if (!valuesClaim.includes(claim.value)) {
                    this.accessDenied();
                }
            }
        }
        
        return true;
    }

    private accessDenied() {
        this.router.navigate(['/acesso-negado']);
    }
    
}
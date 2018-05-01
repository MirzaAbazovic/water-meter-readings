import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { App } from "ionic-angular";

// import { NavController } from "ionic-angular";
@Injectable()
export class VersionInterceptor implements HttpInterceptor {
    version1 = 'application/x.readings.v1+json';
    version2 = 'application/x.readings.v2+json';

    constructor(private storage: Storage,protected app: App) { }
   
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {    
        const clonedRequest = request.clone({
            headers: request.headers.set('Accept', this.version1)
        });
        return next.handle(clonedRequest).do((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            return next.handle(clonedRequest)
          }
        }, (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {  
                console.log('Problem with auth Sever returned 401 Unathorized delete user data');
            this.storage.remove('userData');
            this.app.getRootNav().setRoot('LoginPage');
            }
          }
        });
      }
/*
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //use version 1
        const clonedRequest = req.clone({
            headers: req.headers.set('Accept', this.version1)
        });
        // console.log("new headers", clonedRequest.headers.keys());
        return next.handle(clonedRequest)
         .catch((err) => { //<--if error use a catch
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        //use switchMap to really return next.handle(authReq)
                        console.log('Problem with auth Sever returned 401 Unathorized delete user data');
                        this.storage.remove('userData');
                        this.app.getRootNav().push('LoginPage');

                    };
                    return next.handle(clonedRequest);
                }
                return Observable.throw(err);
            });            
    }*/
}

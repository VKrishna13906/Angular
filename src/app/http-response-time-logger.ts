import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DeviceDetectorService } from "ngx-device-detector";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class HttpResponseTimeLogger implements HttpInterceptor {
  constructor(
    private deviceService: DeviceDetectorService,
    private http: HttpClient
  ) {}

  intercept(req: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
    
    // get timestamp
    const startTimestamp = new Date().getTime();

    const newReq = req.clone({
      headers: req.headers.set('startTimestamp', startTimestamp.toString())
    });

    return next.handle(newReq).pipe(
        tap((res: any) => { 
            // another timestamp
        const endTimestamp: number = new Date().getTime();
        const startTimestamp2: number = Number(res.headers.get('startTimestamp'));

        // get the difference
        const responseTimes = endTimestamp - startTimestamp2;

        // get browser information
        const deviceInfo = this.deviceService.getDeviceInfo();
        let timeInfo = {
            startTime: startTimestamp2,
            endTime: endTimestamp,
            responseTimes:responseTimes,
            deviceInfo: JSON.stringify(deviceInfo)
        }
            console.log(JSON.stringify(timeInfo))
        // send the data to the server
        //this.http.post('URL HERE', {startTime: startTimestamp2,endTime: endTimestamp,deviceInfo: JSON.stringify(deviceInfo)}).subscribe();
        })
      
    );
  }
}

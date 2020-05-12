import {CacheInterceptor} from "./http/cache.interceptor";
import {HttpCacheService} from "./http/cache.service";
import {ApiInterceptor} from "./http/api.interceptor";
import {ErrorHandlerInterceptor} from "./http/error-handler.interceptor";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {HttpService} from "./http/http.service";
import {NgModule, Optional, SkipSelf} from "@angular/core";

@NgModule({
  imports: [HttpClientModule],
  providers: [
    HttpCacheService,
    ApiInterceptor,
    ErrorHandlerInterceptor,
    CacheInterceptor,
    HttpService,
    {
      provide: HttpClient,
      useClass: HttpService
    },
  ]
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Import guard
    if (parentModule) {
      throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
    }
  }
}

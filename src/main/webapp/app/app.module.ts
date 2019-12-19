import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { JhipsterPrintedSharedModule } from 'app/shared/shared.module';
import { JhipsterPrintedCoreModule } from 'app/core/core.module';
import { JhipsterPrintedAppRoutingModule } from './app-routing.module';
import { JhipsterPrintedHomeModule } from './home/home.module';
import { JhipsterPrintedEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    JhipsterPrintedSharedModule,
    JhipsterPrintedCoreModule,
    JhipsterPrintedHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    JhipsterPrintedEntityModule,
    JhipsterPrintedAppRoutingModule
  ],
  declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [JhiMainComponent]
})
export class JhipsterPrintedAppModule {}

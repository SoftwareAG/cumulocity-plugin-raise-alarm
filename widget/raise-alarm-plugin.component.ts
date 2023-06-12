import { Component, Input } from '@angular/core';
import { RaiseAlarmService } from './raise-alarm-plugin.service';
import { IAlarm } from '@c8y/client';
import { AlertService } from '@c8y/ngx-components';
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { RaiseAlarmModalComponent } from './alarm/raise-alarm.component';

@Component({
  selector: 'c8y-widget-plugin',
  template: `
    <div class="p-32 text-center">
      <button type="button" class="btn btn-default" (click)="clickedRaiseAlarm()">Raise Alarm</button>
    </div>
  `,
  styles: [
    `
    .text {
        transform: scaleX(-1);
        font-size: 3em;
      }
    `
  ]
})
export class RaiseAlarmPluginComponent {
  @Input() config;
  constructor( private service: RaiseAlarmService,
    private alerService: AlertService,
    public bsModalService: BsModalService) {
  }

  clickedRaiseAlarm() {
    const ad: number = Date.now();
    const text : string = this.config.text + "-" + ad;
    const alarm: IAlarm = {severity: this.config.severity, source :{ id: this.config?.device?.id} , text: text, type: this.config.type, time: new Date().toISOString()};
    const initialState = {
      alarm: alarm
    };
    const modalRef: BsModalRef = this.bsModalService.show(
      RaiseAlarmModalComponent,
      { initialState }
    );
    modalRef.content.closeSubject.subscribe((alarm: IAlarm) => {
      console.log("Result alarm", alarm);
      if (alarm) {
        this.raiseAlarm(alarm);
        modalRef.hide();
      } else {
        console.log("Cancel created new alarm!");
        modalRef.hide();
      }
    });
  }

  async raiseAlarm (alarm: IAlarm) {
    // const ad: number = Date.now();
    // const text : string = this.config.text + "-" + ad;
    // const alarm: IAlarm = {severity: this.config.severity, source :{ id: this.config?.device?.id} , text: text, type: this.config.type, time: new Date().toISOString()};
    const result : IAlarm = await this.service.createAlarm(alarm);
    console.log("Created new alarm: ", result);
    this.alerService.info("Created new alarm: " + result.id);
  }

}

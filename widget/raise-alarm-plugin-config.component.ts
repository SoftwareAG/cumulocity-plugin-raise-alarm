import { Component, Input } from "@angular/core";
import { ControlContainer, NgForm } from "@angular/forms";
import {
  DynamicComponent,
  OnBeforeSave,
  AlertService,
} from "@c8y/ngx-components";

@Component({
  selector: "c8y-widget-plugin-config",
  template: `
    <div class="form-group">
      <c8y-form-group>
        <label>Alarm Reason</label>
        <textarea
          style="width:100%"
          [(ngModel)]="config.text"
          name="text"
          [required]="true"
        ></textarea>
      </c8y-form-group>
      <c8y-form-group>
        <label>Alarm Type</label>
        <input
          style="width:100%"
          placeholder="e.g. c8y_BreakdownAlarmType"
          [(ngModel)]="config.type"
          name="type"
          [required]="true"
        />
      </c8y-form-group>
      <c8y-form-group>
        <label class="text-truncate" [title]="'Severity'">
          {{ "Alarm Severity" }}
        </label>
        <div class="c8y-select-wrapper">
          <select
            class="form-control"
            (change)="inputChange($event)"
            [(ngModel)]="config.severity"
          >
            <option *ngFor="let entry of severities" [style.background]="entry">
              {{ entry }}
            </option>
          </select>
        </div>
      </c8y-form-group>
    </div>
  `,
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
})
export class RaiseAlarmPluginConfig implements DynamicComponent, OnBeforeSave {
  @Input() config: any = {};

  severities: string[] = ["CRITICAL", "MAJOR", "MINOR", "WARNING"];

  constructor(private alert: AlertService) {}

  onBeforeSave(config: any): boolean {
    if (config.text.trim() === "") {
      this.alert.warning("Please enter a valid text.");
      return false;
    }
    return true;
  }

  inputChange(evt: any): void {
    console.log("Has changed:", evt);
  }
}

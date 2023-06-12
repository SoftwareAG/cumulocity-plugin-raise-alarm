import { Injectable } from "@angular/core";
import {
  IManagedObject,
  AlarmService,
  IResult,
  QueriesUtil,
  IAlarm,
} from "@c8y/client";

 @Injectable({ providedIn: "root" })
export class RaiseAlarmService {
  constructor(protected alarmService: AlarmService) {}

  /** Returns data for current columns and pagination setup. */
  async createAlarm(alarm: IAlarm): Promise<IAlarm> {
    const { res, data } = await this.alarmService.create(alarm);
    // execute inventory query for the list of managed objects
    return data;
  }
}

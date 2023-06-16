import { Injectable } from "@angular/core";
import {
  IManagedObject,
  AlarmService,
  IResult,
  QueriesUtil,
  IAlarm,
  Realtime,
} from "@c8y/client";

@Injectable({ providedIn: "root" })
export class RaiseAlarmService {

  constructor(
    protected alarmService: AlarmService,
    protected realtime: Realtime
  ) {}

  async startListenToUpdate(device: string, callback: (data: any) => void): Promise<object>  {
    return this.realtime.subscribe(`/alarms/${device}`, callback);
  }

  /** Returns data for current columns and pagination setup. */
  async createAlarm(alarm: IAlarm): Promise<IAlarm> {
    const { res, data } = await this.alarmService.create(alarm);
    // execute inventory query for the list of managed objects
    return data;
  }

  stopListenToUpdate(subscription: object): object {
    return this.realtime.unsubscribe(subscription);
  }
}

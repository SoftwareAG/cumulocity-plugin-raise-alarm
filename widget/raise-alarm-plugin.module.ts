import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaiseAlarmPluginComponent } from './raise-alarm-plugin.component';
import { RaiseAlarmPluginConfig } from './raise-alarm-plugin-config.component';
import {
  HOOK_COMPONENTS,
  FormsModule,
  DynamicComponentDefinition,
  gettext
} from '@c8y/ngx-components';
import { RaiseAlarmModalComponent } from './alarm/raise-alarm.component';

@NgModule({
  declarations: [RaiseAlarmPluginComponent, RaiseAlarmPluginConfig, RaiseAlarmModalComponent],
  entryComponents: [RaiseAlarmPluginComponent, RaiseAlarmPluginConfig, RaiseAlarmModalComponent],
  imports: [CommonModule, FormsModule],
  exports: [],
  providers: [
    {
      provide: HOOK_COMPONENTS,
      multi: true,
      useValue: [
        {
          id: 'raise-alarm.widget.plugin',
          label: gettext('Raise alarm widget plugin'),
          description: 'Raise alarm widget plugin',
          component: RaiseAlarmPluginComponent,
          previewImage: 'c8y-widget-preview-img/raise-alarm-preview.png',
          configComponent: RaiseAlarmPluginConfig
        }
      ] as DynamicComponentDefinition[]
    }
  ]
})
export class RaiseAlarmPluginModule {}

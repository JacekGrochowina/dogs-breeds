import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SettingsFacade } from './+state/settings.facade';
import { Range } from './../../resources/interfaces/range.interface';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

  range: Range = {
    min: 1,
    max: 100
  }
  
  settingsFormGroup = this.fb.group({
    photoAmount: ['', [
      Validators.min(1),
      Validators.max(100)
    ]],
    language: [''],
  })

  private unsubscribeSubject = new Subject<void>();

  constructor(
    private settingsFacade: SettingsFacade,
    private fb: FormBuilder,
    private translateService: TranslocoService
  ) { }

  ngOnInit() {
    this.handlePhotoAmount();
    this.handleLanguage();
  }

  ngOnDestroy(): void {
    this.unsubscribeSubject.next();
    this.unsubscribeSubject.complete();
  }

  onChangePhotoAmount(): void {
    this.checkValue();
    this.settingsFacade.setPhotoAmount(this.settingsFormGroup.value.photoAmount);
  }

  selectLanguage(): void {
    this.settingsFacade.setLanguage(this.settingsFormGroup.value.language);
    this.translateService.setActiveLang(this.settingsFormGroup.value.language);
  }

  private handlePhotoAmount(): void {
    this.settingsFacade.photoAmount$
      .pipe(takeUntil(this.unsubscribeSubject))
      .subscribe((photoAmount: number) => {
        this.settingsFormGroup.patchValue({
          photoAmount: photoAmount,
        });
      });
  }

  private handleLanguage(): void {
    this.settingsFacade.language$
      .pipe(takeUntil(this.unsubscribeSubject))
      .subscribe((language: string) => {
        this.settingsFormGroup.patchValue({
          language: language,
        })
      });
  }

  private checkValue(): void {
    if(this.isTooLow()) {
      this.settingsFormGroup.patchValue({
        photoAmount: this.range.min,
      })
    } else if(this.isTooHigh()) {
      this.settingsFormGroup.patchValue({
        photoAmount: this.range.max,
      })
    }
  }

  private isTooLow(): boolean {
    return this.settingsFormGroup.value.photoAmount < this.range.min;
  }

  private isTooHigh(): boolean {
    return this.settingsFormGroup.value.photoAmount > this.range.max;
  }
}

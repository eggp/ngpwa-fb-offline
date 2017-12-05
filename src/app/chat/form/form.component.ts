import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';

export class ChatFormStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    if (!isSubmitted) {
      return false;
    }
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit {
  form: FormGroup;
  msgControl = new FormControl('', {validators: Validators.required, updateOn: 'submit'});
  matcher = new ChatFormStateMatcher();
  @Output() newMsg = new EventEmitter<string>();

  ngOnInit() {
    this.form = new FormGroup(
      {
        msg: this.msgControl
      }
    );
  }

  saveMsg() {
    if (this.form.valid) {
      this.newMsg.emit(this.form.value['msg']);
      this.form.reset({msg: ''});
    }
  }
}

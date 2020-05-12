import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {NzModalRef} from 'ng-zorro-antd';

@Component({
  selector: 'edit-modal',
  template: `
    <div>
      <textarea #contentTextAreaElement nz-col nzSpan="20" rows="2" nz-input>{{content}}</textarea>
    </div>
  `
})
export class EditModalComponent {
  @Input() content: string;
  @ViewChild('contentTextAreaElement', {static: true}) contentTextAreaElement: ElementRef;

  constructor(private modal: NzModalRef) {}
}

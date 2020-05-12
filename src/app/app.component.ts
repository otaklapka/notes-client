import { Component, OnInit } from '@angular/core';
import { NoteService } from './note.service';
import { environment } from '../environments/environment';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { EditModalComponent } from './edit-modal.component';
import { Note } from './model/Note.model';
import { ApiResponse } from './model/ApiResponse.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  noteList: Note[] = [];
  listLoading = false;
  constructor(private notes: NoteService, private message: NzMessageService, private modal: NzModalService) {}

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes() {
    this.listLoading = true;
    this.notes.getAll().subscribe(next => {
      this.noteList = next;
      this.listLoading = false;
    });
  }

  updateNote(note: Note) {
    this.notes.update(note._id, note.content, note.done)
      .subscribe((res: ApiResponse) => {
        if (+res.statusCode === environment.successCode) {
          this.message.success('Úkol byl upraven.');
        } else {
          this.message.error('Nepodařilo se updavit úkol.');
        }
      });
  }

  removeNote(id: string) {
    this.notes.remove(id)
      .subscribe((res: ApiResponse) => {
      if (+res.statusCode === environment.successCode) {
        this.message.success('Úkol byl odstraněn.');
        this.loadNotes();
      } else {
        this.message.error('Nepodařilo se odstranit úkol.');
      }
    });
  }

  openEditModal(note: Note) {
    const modal = this.modal.create({
      nzTitle: 'Upravit poznámku',
      nzContent: EditModalComponent,
      nzGetContainer: () => document.body,
      nzComponentParams: {
        content: note.content,
      },
      nzFooter: [
        {
          label: 'Zavřít',
          onClick: () => modal.destroy()
        },
        {
          label: 'Uložit',
          type: 'primary',
          onClick: (instance: EditModalComponent) => (
            // if this fction returns promise, button will have loading indicator till resolve
            new Promise((resolve, reject) => {
              const content = instance.contentTextAreaElement.nativeElement.value;
              this.notes.update(note._id, content, note.done)
                .subscribe((res: ApiResponse) => {
                  if (+res.statusCode === environment.successCode) {
                    this.message.success('Úkol byl upraven.');
                    this.notes.getAll().subscribe(next => {
                      this.noteList = next;
                      resolve();
                      modal.destroy();
                    });
                  } else {
                    this.message.error('Nepodařilo se updavit úkol.');
                    resolve();
                    modal.destroy();
                  }
                });
            })
          )
        },
      ]
    });
  }

  openCreateModal() {
    const modal = this.modal.create({
      nzTitle: 'Vytvořit poznámku',
      nzContent: EditModalComponent,
      nzGetContainer: () => document.body,
      nzComponentParams: {
        content: '',
      },
      nzFooter: [
        {
          label: 'Zavřít',
          onClick: () => modal.destroy()
        },
        {
          label: 'Vytvořit',
          type: 'primary',
          onClick: (instance: EditModalComponent) => (
            new Promise((resolve, reject) => {
              const content = instance.contentTextAreaElement.nativeElement.value;
              this.notes.create(content)
                .subscribe((res: ApiResponse) => {
                  if (+res.statusCode === environment.successCode) {
                    this.message.success('Úkol byl vytvořen.');
                    this.notes.getAll().subscribe(next => {
                      this.noteList = next;
                      resolve();
                      modal.destroy();
                    });
                  } else {
                    this.message.error('Nepodařilo se vytvořit úkol.');
                    resolve();
                    modal.destroy();
                  }
                });
            })
          )
        },
      ]
    });
  }
}

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoresReasonDialogComponent } from './scores-reason-dialog.component';

describe('ScoresReasonDialogComponent', () => {
  let component: ScoresReasonDialogComponent;
  let fixture: ComponentFixture<ScoresReasonDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoresReasonDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoresReasonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

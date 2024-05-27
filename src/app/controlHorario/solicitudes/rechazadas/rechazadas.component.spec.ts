import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechazadasComponent } from './rechazadas.component';

describe('RechazadasComponent', () => {
  let component: RechazadasComponent;
  let fixture: ComponentFixture<RechazadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RechazadasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RechazadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

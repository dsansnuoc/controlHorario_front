import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposPausaComponent } from './tipos-pausa.component';

describe('TiposPausaComponent', () => {
  let component: TiposPausaComponent;
  let fixture: ComponentFixture<TiposPausaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiposPausaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TiposPausaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

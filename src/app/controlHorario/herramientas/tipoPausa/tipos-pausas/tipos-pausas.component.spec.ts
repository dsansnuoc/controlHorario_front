import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposPausasComponent } from './tipos-pausas.component';

describe('TiposPausasComponent', () => {
  let component: TiposPausasComponent;
  let fixture: ComponentFixture<TiposPausasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiposPausasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TiposPausasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

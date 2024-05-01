import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposSolicitudesComponent } from './tipos-solicitudes.component';

describe('TiposSolicitudesComponent', () => {
  let component: TiposSolicitudesComponent;
  let fixture: ComponentFixture<TiposSolicitudesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiposSolicitudesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TiposSolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

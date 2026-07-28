import { TestBed } from '@angular/core/testing';
import { BooleanStatusPipe } from './boolean-status.pipe';

describe('BooleanStatusPipe', () => {
  it('create an instance', () => {
    const pipe = TestBed.runInInjectionContext(() => new BooleanStatusPipe());

    expect(pipe).toBeTruthy();
  });
});

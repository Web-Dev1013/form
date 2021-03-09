import { Category, Parent, SubMenu } from './category';

describe('Category', () => {
  it('should create an instance', () => {
    expect(new Category()).toBeTruthy();
  });
});

describe('Parent', () => {
  it('should create an instance', () => {
    expect(new Parent()).toBeTruthy();
  });
});

describe('SubMenu', () => {
  it('should create an instance', () => {
    expect(new SubMenu()).toBeTruthy();
  });
});

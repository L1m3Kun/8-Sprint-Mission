export const API_PATH = {
  usersPath: { default: '/users' },
  productPath: { default: '/products' },
  imagesPath: { default: '/images' },
  commentPath: { default: '/comment' },
  authPath: {
    default: '/auth',
    signUp: '/auth/signUp',
    signIn: '/auth/signIn',
    refreshToken: '/auth/refresh-token',
  },
  articlePath: {
    default: '/articles',
    like(id: number) {
      return `${this.default}/${id}/like`;
    },
  },
  get users() {
    return this.usersPath.default;
  },
  get product() {
    return this.productPath.default;
  },
  get images() {
    return this.imagesPath.default;
  },
  get comment() {
    return this.commentPath.default;
  },
  get article() {
    return this.articlePath.default;
  },
  get auth() {
    return this.authPath.default;
  },
};
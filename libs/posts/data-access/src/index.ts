import * as PostsActions from './lib/+state/posts.actions';
import * as PostsFeature from './lib/+state/posts.reducer';
import * as PostsSelectors from './lib/+state/posts.selectors';
export { PostsActions, PostsFeature, PostsSelectors };
export * from './lib/+state/posts.models';
export * from './lib/+state/posts.facade';
export * from './lib/posts-data-access.module';
export * from './lib/services/posts.service';
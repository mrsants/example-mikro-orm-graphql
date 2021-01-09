import { Post } from "src/entities/Post";
import { MyContext } from "src/types";
import { Ctx, Query, Resolver } from "type-graphql";

@Resolver()
export class PostsResolver {
  @Query(()=> [Post]) 
  posts(
    @Ctx() { em }: MyContext
  ) {
    return em.find(Post, {});
  }
}

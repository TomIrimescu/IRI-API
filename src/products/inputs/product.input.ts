import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class ProductInput {
  @Field()
  name: string;
  @Field()
  category: string;
  @Field()
  description: string;
  @Field(() => Int)
  price: number;

}

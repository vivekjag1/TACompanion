import {todoMutations} from "../graphql/mutations";
import {todoQueries} from "../graphql/queries";

export const resolvers = {
  Query:{
    ...todoQueries
  },
  Mutation:{
    ...todoMutations
  }
};
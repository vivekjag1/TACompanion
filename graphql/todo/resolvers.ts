import {todoMutations} from "./mutations";
import {todoQueries} from "./queries";

export const resolvers = {
  Query:{
    ...todoQueries
  },
  Mutation:{
    ...todoMutations
  }
};
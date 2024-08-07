import { Dispatch, Reducer } from 'redux';
import toNS from 'mongodb-ns';
import { getAggregations } from './../utlis/aggregations';
import { getQueries } from './../utlis/queries';

export enum ActionTypes {
  ITEMS_FETCHED = 'compass-saved-aggregations-queries/itemsFetched',
}

export type Actions = {
  type: ActionTypes.ITEMS_FETCHED;
  payload: Item[];
};

export type Item = {
  id: string;
  lastModified: number;
  name: string;
  database: string;
  collection: string;
  type: 'query' | 'aggregation';
};

export type State = {
  loading: boolean;
  items: Item[];
};

const INITIAL_STATE: State = {
  loading: true,
  items: [],
};

const reducer: Reducer<State, Actions> = (state = INITIAL_STATE, action) => {
  if (action.type === ActionTypes.ITEMS_FETCHED) {
    return {
      ...state,
      items: action.payload,
      loading: false,
    };
  }
  return state;
};

export const fetchItems = () => {
  return async (dispatch: Dispatch<Actions>): Promise<void> => {
    const payload = await Promise.allSettled([
      getAggregationItems(),
      getQueryItems(),
    ]);
    dispatch({
      type: ActionTypes.ITEMS_FETCHED,
      payload: payload
        .map((result: PromiseSettledResult<Item[]>) =>
          result.status === 'fulfilled' ? result.value : []
        )
        .flat(),
    });
  };
};

const getAggregationItems = async (): Promise<Item[]> => {
  const aggregations = await getAggregations();
  return aggregations.map((aggregation) => {
    const { database, collection } = toNS(aggregation.namespace);
    return {
      id: aggregation.id,
      lastModified: aggregation.lastModified,
      name: aggregation.name,
      database,
      collection,
      type: 'aggregation',
    };
  });
};

const getQueryItems = async (): Promise<Item[]> => {
  const queries = await getQueries();
  return queries.map((query) => {
    const { database, collection } = toNS(query._ns);
    return {
      id: query._id,
      lastModified: query._dateSaved,
      name: query._name,
      database,
      collection,
      type: 'query',
    };
  });
};

export default reducer;

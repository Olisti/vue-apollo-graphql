import { Module } from 'vuex';
import { RootState } from './index';
import { Book } from '@/types/book';
import { GQLResponse } from '@/types/response';
import { apolloClient } from '../graphql/vue-apollo';
import { Notification } from 'element-ui';

export interface State {
    books: Book[];
    loading: boolean;
}

export default {
    namespaced: true,
    state: {
        books: [],
        loading: false
    },
    getters: {
        BOOKS: (state: State) => state.books,
        LOADING: (state: State) => state.loading
    },
    actions: {
        GET_LIST: async ({ commit }) => {
            commit('SET_LOADING', true);
            apolloClient
                .mutate({ mutation: require('./../graphql/queries/books.gql') })
                .then((data: GQLResponse) => commit('SET_BOOKS', data.data.books))
                .catch(() => showError())
                .finally(() => commit('SET_LOADING', false));
        },
        WATCH_LIST: async ({ commit }) => {
            apolloClient.subscribe({ query: require('./../graphql/subscriptions/books.gql') }).subscribe({
                next: (data: GQLResponse) => commit('SET_BOOKS', data.data.booksList),
                error: (error: string) => showError()
            });
        },
        ADD: async ({ commit, state, dispatch }, payload: Book) => {
            commit('SET_LOADING', true);
            apolloClient
                .mutate({
                    mutation: require('./../graphql/mutations/addBook.gql'),
                    variables: { ...payload }
                })
                .then((data: GQLResponse) => {
                    Notification.success({
                        title: 'Success',
                        message: `Book ${payload.title} added`
                    });
                })
                .catch(() => showError())
                .finally(() => commit('SET_LOADING', false));
        }
    },
    mutations: {
        SET_BOOKS: (state, payload: Book[]) => {
            state.books = payload;
        },
        SET_LOADING: (state, payload: boolean) => {
            state.loading = payload;
        }
    }
} as Module<State, RootState>;

function showError() {
    Notification.error({
        title: 'Error',
        message: 'Something went wrong'
    });
}

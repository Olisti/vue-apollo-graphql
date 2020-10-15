import { Book } from './book';

export interface GQLResponse {
    data: {
        books?: Book[];
        booksList?: Book[];
    };
}

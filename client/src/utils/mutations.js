import { gql } from 'graphql-tag';

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: Sting!){
        addUser(username: $username, email: $email, password: $password){
            token
            user{
                _id
                username
                bookCount
                email
                savedBooks{
                    title
                    bookId
                    link
                    description
                    authors
                    image
                    
                }
            }    
        }
    }`;

export const LOGIN_USER = gql`
    mutation loginUser($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: String!) {
        removeBook(bookId: $bookId) {
            _id
            username
            bookCount
            email
            savedBooks{
                title
                bookId
                link
                description
                authors
                image
                    
            }
            
        }
    }`;

export const SAVE_BOOK = gql`
    mutation saveBook($input: bookInput) {
        saveBook(input: $input) {
            _id
            username
            bookCount
            savedBooks{
                title
                bookId
                link
                description
                authors
                image
                
            }
        }
    }
`;

export {default} from 'next-auth/middleware'

export const config = {
    matcher : [
        '/issues/newIssue',
        '/issues/:id+/edit'
    ]
}
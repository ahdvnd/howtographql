---
title: "Mutations: Creating Links"
videoId: QZWAAmp406s
videoAuthor: "Abhi Aiyer"
question: Can you choose the first answer to this question?
answers: ["That sounds too easy", "I think this question is fake", "When are the real questions ready", "No"]
correctAnswer: 0
---

In this section, you'll learn how you can send mutations and update the cache afterwards with Relay. 


### Preparing the React components

Like before, let's start by writing the React component where users will be able to add new links.

<Instruction>

Create a new file in the `src/components` directory and call it `CreateLink.js`. Then paste the following code into it:

```js(path=".../hackernews-react-apollo/src/components/CreateLink.js")
import React, { Component } from 'react'

class CreateLink extends Component {

  state = {
    description: '',
    url: ''
  }

  render() {

    return (
      <div>
        <div className='flex flex-column mt3'>
          <input
            className='mb2'
            value={this.state.description}
            onChange={(e) => this.setState({ description: e.target.value })}
            type='text'
            placeholder='A description for the link'
          />
          <input
            className='mb2'
            value={this.state.url}
            onChange={(e) => this.setState({ url: e.target.value })}
            type='text'
            placeholder='The URL for the link'
          />
        </div>
        <div
          className='button'
          onClick={() => this._createLink()}
        >
          submit
        </div>
      </div>
    )

  }

  _createLink = async () => {
    // ... you'll implement this in a bit
  }

}

export default CreateLink
```

</Instruction>


This is a standard setup for a React component with two `input` fields where users can provide the `url` and `description` of the `Link` they want to create. The data that's typed into these fields is stored in the component's `state` and will be used in `_createLink` when the mutation is sent.

Great, but how can you now actually implement `_createLink` and send the mutation?

### Writing the Mutation

Mutations were one of the major pain points developers had with Relay Classic. The way how they've been implemented was in a declarative and powerful way. However, it was very difficult to actually understand how they worked since there was so much _magic_ going on behind the scenes. As a result, the main concern was that they're not predictible enough and developers had a hard time to reason about them.

That's why one of the major goals of Relay Modern was also to introduce a new and more approachable mutation API. The Facebook team delivered that and Relay now exposes a more [_imperative_ API](https://facebook.github.io/relay/docs/mutations.html) that allows to manipulate the local store directly (actually, the manipulation happens through a dedicated _proxy_ object, but it's definitely much more direct than before).

<Instruction>

To implement the mutation for adding new links, first create a new directory called `mutations` in `src` and then create a new file called `CreateLinkMutation.js` that you put into that new directory. Then paste the following code into it:

```js(path=".../hackernews-react-relay/src/mutations/CreateLinkMutation.js")
// 1
import {
  commitMutation,
  graphql,
} from 'react-relay'
import { ConnectionHandler } from 'relay-runtime'
import environment from './Environment'

// 2
const mutation = graphql`
  mutation CreateLinkMutation($input: CreateLinkInput!) {
    createLink(input: $input) {
      link {
        id
        createdAt
        url
        description
        postedBy {
          id
          name
        }
      }
    }
  }
`

// 3
export default (description, imageUrl, viewerId, callback) => {
  // 4
  const variables = {
    input: {
      description,
      imageUrl,
      clientMutationId: ""
    },
  }

  // 5
  commitMutation(
    environment,
    {
      mutation,
      variables,
      // 6
      optimisticUpdater: (proxyStore) => {
        // ... you'll implement this in a bit
      },
      updater: (proxyStore) => {
        // ... this as well
      },
      // 7
      onCompleted: () => {
        callback()
      },
      onError: err => console.error(err),
    },
  )
}
```

<Instruction>






































Now, run `yarn start`, you'll see the following screen:

![](http://imgur.com/AJNlEfj.png) 

Two input fields and a _submit_-button - not very pretty but functional.

Enter some data into the fields, e.g.:

- **Description**: `The best learning resource for GraphQL`
- **URL**: `www.howtographql.com`

Then click the _submit_-button. You won't get any visual feedback in the UI, but let's see if the query actually worked by checking the current list of links in a Playground.

Type `graphcool playground` into a Terminal and send the following query:

```graphql
{
  allLinks {
    description
    url
  }
}
```

You'll see the following server response:

```js
{
  "data": {
    "allLinks": [
      {
        "description": "The best learning resource for GraphQL",
        "url": "www.howtographql.com"
      },
      // ...
    ]
  }
}
```

Awesome! The mutation works, great job! 💪
import React, { Component } from "react";
import Head from "next/head";
import Loader from '../components/loader';
import InfiniteScroll from 'react-infinite-scroller';
import superagent from 'superagent'
import { get as _get, merge as _merge, set as _set, range as _range } from 'lodash'

export default class Lazyload extends Component {

  constructor(props) {
    super(props)
    this._loadMore = this._loadMore.bind(this)
    this._handleSubParagraph = this._handleSubParagraph.bind(this)
    this._handleNextPage = this._handleNextPage.bind(this)
    this.state = {
      transcript: {},
      hasMore: true,
      currentPage: props.pageStart
    }
  }

  _loadMore(page) {
    superagent.get(`http://localhost:3000/transcript?page=${page}`)
      .end((err, res) => {
        let body = _get(res, 'body', {}),
            data = _get(body, 'data', {}),
            paginData = _get(data, page, []),
            hasMore = _get(body, 'hasMore', false),
            transcript = _get(this, 'state.transcript', {})

        if (paginData.length) {
          _set(transcript, page, paginData)
          this.setState({transcript, hasMore, currentPage: page })  
        }
        
      })
  }

  _handleSubParagraph(currentParagraph) {

    let { transcript } = this.state,
        text = [],
        main,
        sub,
        paginData = _get(transcript, currentParagraph, {})

    for (let i=0; i<paginData.length; i++) {
      let name = _get(paginData, `${i}.name`, ''),
          para = _get(paginData, `${i}.para`, ''),
          arr = para.split('-')

      sub = arr[1]
      main = arr[0]

      text[sub] = (text[sub] || '') + ` ${name}`

    }
    return text.map((subPara, i) => <p key={`${main}-${i}`} className={`${main}-${i}`}>{ subPara }</p>)
    
  }

  _handleNextPage(e) {
    e && e.preventDefault()
    let { currentPage, hasMore } = this.state,
        nextPage = currentPage + 1
    if (nextPage && hasMore)
      this._loadMore(nextPage)

  }

  render() {
    let { pageStart } = this.props,
        { transcript, hasMore, currentPage } = this.state,
        subPara,
        paragraph = []

    return (
      <div>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous" />
        </Head>

        <div id="content" className="p-4">
          <h1>Transcript</h1>
          <div className="p-4">
            <InfiniteScroll pageStart={pageStart} loadMore={this._loadMore} hasMore={hasMore} loader={Loader}>
              <div>
              { _range(0, currentPage + 1).reduce((accu, value) => accu.concat(this._handleSubParagraph(value)), []) }
              </div>
            </InfiniteScroll>
          </div>
          <div className="text-center">
            <button onClick={this._handleNextPage} className="btn btn-info">Next Page</button>
          </div>
        </div>
      </div>
    )
  }

}

Lazyload.defaultProps = {
  pageStart: 1
}


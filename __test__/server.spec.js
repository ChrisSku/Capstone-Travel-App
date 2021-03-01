//****************************** */
//SERVER SIDE TESTS
//****************************** */
const request = require('supertest')
const app = require('../src/server/app')

describe('Testing Saved Trips API', () => {
  //Test the GET fuctionality
  it('It should response the GET method with status:200', done => {
    request(app)
      .get('/trips/saved')
      // Sends GET Request to / endpoint
      .then(response => {
        expect(response.statusCode).toBe(200)
        done()
      })
  })
  it('It should countain the expected object', done => {
    const expected = {
      id: 1,
      location: 'Madrid',
      startDate: '2021-02-25',
      endDate: '2021-03-11'
    }
    request(app)
      .get('/trips/saved')
      // Sends GET Request to / endpoint
      .then(response => {
        expect(response.body).toContainEqual(expected)
        done()
      })
  })
})

describe('Testing best places Trips API', () => {
  //Test the GET fuctionality
  it('It should response the GET method with status:200', done => {
    request(app)
      .get('/trips/best-places')
      // Sends GET Request to / endpoint
      .then(response => {
        expect(response.statusCode).toBe(200)
        done()
      })
  })
  it('It should countain the expected object', done => {
    const expected = {
      id: 1,
      location: 'Madrid',
      startDate: '2021-02-25',
      endDate: '2021-03-11'
    }
    request(app)
      .get('/trips/best-places')
      // Sends GET Request to / endpoint
      .then(response => {
        expect(response.body).toContain('Madrid')
        done()
      })
  })
})

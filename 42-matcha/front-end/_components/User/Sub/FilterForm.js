/*
** This component has been made very fastly
** He must be optimized
*/

// React dependancies

import React from 'react'

// App dependancies

// Middlewares

import PropTypes from 'prop-types'
import _ from 'lodash'

import Slider from 'rc-slider'
import { Typeahead } from 'react-bootstrap-typeahead'

// Code

const { createSliderWithTooltip } = Slider
const Range = createSliderWithTooltip(Slider.Range)

function sortByAge (a, b) {
  return (a.age - b.age)
}
function sortByScore (a, b) {
  return (b.score - a.score)
}
function sortByPlace (a, b) {
  return (a.position.city.localeCompare(b.position.city))
}
function sortByDistance (a, b) {
  return (a.dist - b.dist)
}
function sortByDefault (a, b) {
  return (b.gscore - a.gscore)
}
function sortByInterests (a, b) {
  const { self } = this.state

  if (!self)
    return (-1)
  else {
    const aScore = _.intersection(a.interests, self.interests).length
    const bScore = _.intersection(b.interests, self.interests).length

    return (bScore - aScore)
  }
}

export default class FilterForm extends React.Component
{
  constructor (props) {
    super(props)

    this.state = {
      filtered: { ...props.users },
      informations: {
        age: {
          defaultValue: [18, 99],
          currentValue: [18, 99],
          min: 18,
          max: 99,
          step: 1
        },
        interests: {
          defaultValue: [],
          currentValue: [],
          options: []
        },
        places: {
          defaultValue: [],
          currentValue: [],
          options: []
        },
        score: {
          defaultValue: [300, 3200],
          currentValue: [300, 3200],
          min: 300,
          max: 3200,
          step: 10
        },
        sortReverse: false,
        sortKey: null,
        sortBy: {
          none: sortByDefault,
          age: sortByAge,
          distance: sortByDistance,
          interests: sortByInterests.bind(this),
          score: sortByScore,
          place: sortByPlace
        }
      },
      self: { ...props.self },
      users: { ...props.users }
    }
  }

  componentWillReceiveProps (nextProps) {
    const state = this.state
    var hasChanged = false

    if (nextProps.self !== state.self) {
      state.self = nextProps.self
      hasChanged = true
    }
    if (nextProps.users !== state.users) {
      const { users } = nextProps

      if (users && users.length) {
        // Places tags initialization
        const positions = _.map(users, 'position')
        const cities = _.map(positions, (value, key) => { return { name: value.city } })
        const places = _.uniqBy(cities, 'name')

        // Interests tags initialization
        const globalInterests = _.map(users, 'interests')
        const flattenInterests = _.flatten(globalInterests)
        const formattedInterests = _.map(flattenInterests, (value) => { return { name: value } })
        const interests = _.uniqBy(formattedInterests, 'name')

        // Initialization of options
        state.informations.places.options = places
        state.informations.interests.options = interests

        state.users = users
        state.filtered = users
        this.props.onFilter(users)
      }
      hasChanged = true
    }
    if (hasChanged)
      this.setState(state)
  }

  shouldComponentUpdate () {
    return (true)
  }

  handleFiltering (data, key) {
    const { state } = this
    const { users, informations } = state
    const { age, interests, places, score } = informations
    const filtered = (users && users.length) ? users.slice() : []

    state.informations[key].currentValue = data
    if (filtered && filtered.length) {
      state.filtered = filtered.filter((user) => {
        if (user.score < score.currentValue[0] || user.score > score.currentValue[1])
          return (false)
        if (user.age < age.currentValue[0] || user.age > age.currentValue[1])
          return (false)
        if (interests.currentValue.length && !_.intersection(_.map(interests.currentValue, 'name'), user.interests).length)
          return (false)
        if (places.currentValue.length && places.currentValue.findIndex(i => i.name === user.position.city) === -1)
          return (false)
        return (true)
      })
    }
    this.props.onFilter(state.filtered)
    this.setState(state)
  }

  updateSortValue (e) {
    const { state } = this
    const { filtered } = state
    const { value } = e.target

    if (filtered && filtered.length)
      filtered.sort(state.informations.sortBy[value])
    this.props.onFilter(state.filtered)
    this.setState(state)
  }

  updateSortReverseValue (e) {
    const { state } = this
    const { filtered } = state

    if (filtered && filtered.length)
      filtered.reverse()
    this.props.onFilter(state.filtered)
    this.setState(state)
  }

  render () {
    const { state } = this

    return (
      <form className="form-inline" id="filter-form" role="form">
        <div className="">
          <div className="form-group col-xs-12 col-md-6">
            <label className="col-form-label" htmlFor="inputAge">{'Age'}</label>
            <div className="col-md-12 slider-wrapper">
              <Range
                allowCross={false}
                defaultValue={this.state.informations.age.defaultValue}
                id="inputAge"
                max={this.state.informations.age.max}
                min={this.state.informations.age.min}
                onChange={(data) => { this.handleFiltering(data, 'age') }}
                step={this.state.informations.age.step}
                tipFormatter={value => `${value} year`}
              />
            </div>
          </div>
          <div className="form-group col-xs-12 col-md-6">
            <label className="col-form-label" htmlFor="inputScore">{'Score'}</label>
            <div className="col-md-12 slider-wrapper">
              <Range
                allowCross={false}
                defaultValue={this.state.informations.score.defaultValue}
                id="inputScore"
                max={this.state.informations.score.max}
                min={this.state.informations.score.min}
                onChange={(e) => { this.handleFiltering(e, 'score') }}
                step={this.state.informations.score.step}
                tipFormatter={value => `${value} pts`}
              />
            </div>
          </div>
          <div className="form-group col-xs-12 col-md-12">
            <label className="col-form-label" htmlFor="places">{'Places'}</label><br />
            <Typeahead
              allowNew
              clearButton
              defaultSelected={state.informations.places.defaultValue}
              id="places"
              labelKey="name"
              multiple
              onChange={(e) => { this.handleFiltering(e, 'places') }}
              options={state.informations.places.options}
              placeholder={'Paris, New-York, Rome...'}
              selected={state.informations.places.currentValue}
            />
          </div>
          <div className="form-group col-xs-12 col-md-12">
            <label className="col-form-label" htmlFor="places">{'Interests'}</label><br />
            <Typeahead
              allowNew
              clearButton
              defaultSelected={state.informations.interests.defaultValue}
              id="interests"
              labelKey="name"
              multiple
              onChange={(e) => { this.handleFiltering(e, 'interests') }}
              options={state.informations.interests.options}
              placeholder={'Cinema, Music, Video Games...'}
              selected={state.informations.interests.currentValue}
            />
          </div>
          <div className="form-group form-inline col-xs-12 col-md-12">
            <label className="col-form-label" htmlFor="sorting-select">{'Sort options'}</label><br />
            <div className="form-inline">
              <select className="form-control" id="sorting-select" onChange={(e) => { this.updateSortValue(e) }}>
                <option default value="none">{'Default'}</option>
                <option value="distance">{'Distance'}</option>
                <option value="age">{'Age'}</option>
                <option value="score">{'Score'}</option>
                <option value="place">{'Places'}</option>
                <option value="interests">{'Interests'}</option>
              </select>
              <button className="btn btn-default" onClick={(e) => { this.updateSortReverseValue(e) }} type="button">{'Invert'}</button>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

FilterForm.defaultProps = {
  self: {},
  users: []
}

FilterForm.propTypes = {
  onFilter: PropTypes.func.isRequired,
  self: PropTypes.object,
  users: PropTypes.array
}

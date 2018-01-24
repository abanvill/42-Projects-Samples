import { userConstants } from '../_constants'

const initialState = { }

export function user (state = initialState, action) {
  switch (action.type) {
    /*
    ** Others
    */

    case (userConstants.LOGOUT_REQUEST):
      return ({
        ...state
      })
    case (userConstants.LOGOUT_SUCCESS):
      return ({})
    case (userConstants.LOGOUT_FAILURE):
      return ({
        ...state
      })

    /*
    ** Users lists
    */

    case (userConstants.LIST_ALL_USERS_REQUEST):
      return ({
        ...state
      })
    case (userConstants.LIST_ALL_USERS_SUCCESS):
      return ({
        ...state,
        allUsers: action.data.content,
        requested: true
      })
    case (userConstants.LIST_ALL_USERS_FAILURE):
      return ({
        ...state,
        error: action.error,
        requested: true
      })

    case (userConstants.SUGGEST_USERS_REQUEST):
      return ({
        ...state
      })
    case (userConstants.SUGGEST_USERS_SUCCESS):
      return ({
        ...state,
        suggestedUsers: action.data.content,
        requested: true
      })
    case (userConstants.SUGGEST_USERS_FAILURE):
      return ({
        ...state,
        error: action.error,
        requested: true
      })

    /*
    ** Messages
    */

    case (userConstants.LIST_MESSAGES_REQUEST):
      return ({
        ...state
      })
    case (userConstants.LIST_MESSAGES_SUCCESS):
      if (state.self)
        state.self.threads = action.data.content
      return ({
        ...state,
        requested: true
      })
    case (userConstants.LIST_MESSAGES_FAILURE):
      return ({
        ...state,
        error: action.error,
        requested: true
      })

    case (userConstants.LIST_MESSAGES_FROM_REQUEST):
      return ({
        ...state
      })
    case (userConstants.LIST_MESSAGES_FROM_SUCCESS):
      return ({
        ...state,
        messages: action.data.content,
        messagesFromListed: true,
        requested: true
      })
    case (userConstants.LIST_MESSAGES_FROM_FAILURE):
      return ({
        ...state,
        error: action.error,
        messagesFromListed: false,
        requested: true
      })

    /*
    ** notifications
    */

    case (userConstants.UPDATE_NOTIFICATIONS_REQUEST):
      return ({
        ...state
      })
    case (userConstants.UPDATE_NOTIFICATIONS_SUCCESS):
    {
      const { notifications, informations } = action.data

      if (notifications && notifications.length)
        state.self.notifications = notifications
      if (informations)
        state.self.informations = informations

      return ({
        ...state,
        notificationsUpdated: true,
        requested: true
      })
    }
    case (userConstants.UPDATE_NOTIFICATIONS_FAILURE):
      return ({
        ...state,
        error: action.error,
        notificationsUpdated: false,
        requested: true
      })

    case (userConstants.REFRESH_GUESTS_REQUEST):
      return ({
        ...state
      })
    case (userConstants.REFRESH_GUESTS_SUCCESS):
    {
      const { viewedBy, informations } = action.data

      if (viewedBy && viewedBy.length)
        state.self.viewed_by = viewedBy
      if (informations)
        state.self.informations = informations

      return ({
        ...state,
        guestsRefreshed: true,
        requested: true
      })
    }
    case (userConstants.REFRESH_GUESTS_FAILURE):
      return ({
        ...state,
        error: action.error,
        guestsRefreshed: false,
        requested: true
      })

    case (userConstants.REFRESH_NOTIFICATIONS_REQUEST):
      return ({
        ...state
      })
    case (userConstants.REFRESH_NOTIFICATIONS_SUCCESS):
    {
      const { notifications, informations } = action.data

      if (notifications && notifications.length)
        state.self.notifications = notifications
      if (informations)
        state.self.informations = informations

      return ({
        ...state,
        notificationsRefreshed: true,
        requested: true
      })
    }
    case (userConstants.REFRESH_NOTIFICATIONS_FAILURE):
      return ({
        ...state,
        error: action.error,
        notificationsRefreshed: false,
        requested: true
      })

    case (userConstants.UPDATE_MESSAGES_FROM_REQUEST):
      return ({
        ...state
      })
    case (userConstants.UPDATE_MESSAGES_FROM_SUCCESS):
      return ({
        ...state,
        messagesFromUpdated: true,
        requested: true
      })
    case (userConstants.UPDATE_MESSAGES_FROM_FAILURE):
      return ({
        ...state,
        error: action.error,
        messagesFromUpdated: false,
        requested: true
      })

    case (userConstants.REFRESH_MESSAGES_FROM_REQUEST):
      return ({
        ...state
      })
    case (userConstants.REFRESH_MESSAGES_FROM_SUCCESS):
      if (state.self && action.data.content)
      {
        /* Optimized way */
        const thread = state.self.threads[action.data.target]
        // const index = thread.length - 1
        //
        // if (thread[index] !== action.data.content)
        thread.push(action.data.content)

        /* Not at all Optimized way */
        // state.self.threads[action.data.target] = action.data.content
      }
      return ({
        ...state,
        messagesFromRefreshed: true,
        requested: true
      })
    case (userConstants.REFRESH_MESSAGES_FROM_FAILURE):
      return ({
        ...state,
        error: action.error,
        messagesFromRefreshed: false,
        requested: true
      })

    /*
    ** Interactions
    */

    case (userConstants.TALK_INTERACTION_REQUEST):
      return ({
        ...state
      })
    case (userConstants.TALK_INTERACTION_SUCCESS):
      if (state.self && action.data.content)
        state.self.threads[action.data.target].push(action.data.content)
      return ({
        ...state,
        requested: true
      })
    case (userConstants.TALK_INTERACTION_FAILURE):
      return ({
        ...state,
        error: action.error,
        requested: true
      })

    case (userConstants.LIKE_INTERACTION_REQUEST):
      return ({
        ...state
      })
    case (userConstants.LIKE_INTERACTION_SUCCESS):
      state.self = action.data.content
      return ({
        ...state,
        userLiked: true,
        requested: true
      })
    case (userConstants.LIKE_INTERACTION_FAILURE):
      return ({
        ...state,
        error: action.error,
        userLiked: false,
        requested: true
      })

    case (userConstants.UNLIKE_INTERACTION_REQUEST):
      return ({
        ...state
      })
    case (userConstants.UNLIKE_INTERACTION_SUCCESS):
      state.self = action.data.content
      return ({
        ...state,
        error: undefined,
        userUnliked: true,
        requested: true
      })
    case (userConstants.UNLIKE_INTERACTION_FAILURE):
      return ({
        ...state,
        error: action.error,
        userUnliked: false,
        requested: true
      })

    case (userConstants.BLOCK_INTERACTION_REQUEST):
      return ({
        ...state
      })
    case (userConstants.BLOCK_INTERACTION_SUCCESS):
      state.self = action.data.content
      return ({
        ...state,
        userBlocked: true,
        requested: true
      })
    case (userConstants.BLOCK_INTERACTION_FAILURE):
      return ({
        ...state,
        error: action.error,
        userBlocked: false,
        requested: true
      })

    case (userConstants.UNBLOCK_INTERACTION_REQUEST):
      return ({
        ...state
      })
    case (userConstants.UNBLOCK_INTERACTION_SUCCESS):
      state.self = action.data.content
      return ({
        ...state,
        userUnblocked: true,
        requested: true
      })
    case (userConstants.UNBLOCK_INTERACTION_FAILURE):
      return ({
        ...state,
        error: action.error,
        userUnblocked: false,
        requested: true
      })

    case (userConstants.REPORT_INTERACTION_REQUEST):
      return ({
        ...state
      })
    case (userConstants.REPORT_INTERACTION_SUCCESS):
      return ({
        ...state,
        userReported: true,
        requested: true
      })
    case (userConstants.REPORT_INTERACTION_FAILURE):
      return ({
        ...state,
        error: action.error,
        userReported: false,
        requested: true
      })

    case (userConstants.VIEW_INTERACTION_REQUEST):
      return ({
        ...state
      })
    case (userConstants.VIEW_INTERACTION_SUCCESS):
      return ({
        ...state,
        userViewed: true,
        requested: true
      })
    case (userConstants.VIEW_INTERACTION_FAILURE):
      return ({
        ...state,
        error: action.error,
        userViewed: false,
        requested: true
      })

    /*
    ** Infos
    */

    case (userConstants.GET_BASE_INFOS_REQUEST):
      return ({
        ...state
      })
    case (userConstants.GET_BASE_INFOS_SUCCESS):
      return ({
        ...state,
        base: action.data.content,
        requested: true
      })
    case (userConstants.GET_BASE_INFOS_FAILURE):
      return ({
        ...state,
        error: action.error,
        requested: true
      })

    case (userConstants.LIST_INFOS_REQUEST):
      return ({
        ...state
      })
    case (userConstants.LIST_INFOS_SUCCESS):
      return ({
        ...state,
        self: action.data.content,
        requested: true
      })
    case (userConstants.LIST_INFOS_FAILURE):
      return ({
        ...state,
        error: action.error,
        requested: true
      })

    case (userConstants.LIST_INFOS_FROM_REQUEST):
      return ({
        ...state
      })
    case (userConstants.LIST_INFOS_FROM_SUCCESS):
      return ({
        ...state,
        from: action.data.content,
        requested: true
      })
    case (userConstants.LIST_INFOS_FROM_FAILURE):
      return ({
        ...state,
        error: action.error,
        requested: true
      })

    /*
    ** Edit account
    */

    case (userConstants.UPDATE_PASSWORD_REQUEST):
      return ({
        ...state
      })
    case (userConstants.UPDATE_PASSWORD_SUCCESS):
      return ({
        ...state,
        error: null,
        requested: true,
        passwordUpdated: true
      })
    case (userConstants.UPDATE_PASSWORD_FAILURE):
      return ({
        ...state,
        error: action.error,
        requested: true,
        passwordUpdated: false
      })

    case (userConstants.UPDATE_EMAIL_REQUEST):
      return ({
        ...state
      })
    case (userConstants.UPDATE_EMAIL_SUCCESS):
      if (state.self)
        state.self.email = action.data.content
      return ({
        ...state,
        error: null,
        requested: true,
        emailUpdated: true
      })
    case (userConstants.UPDATE_EMAIL_FAILURE):
      return ({
        ...state,
        error: action.error,
        requested: true,
        emailUpdated: false
      })

      /*
      ** Edit profile
      */

    case (userConstants.UPDATE_PROFILE_REQUEST):
      return ({
        ...state
      })
    case (userConstants.UPDATE_PROFILE_SUCCESS):
      if (state.self)
        state.self = action.data.content
      return ({
        ...state,
        error: null,
        requested: true,
        profileUpdated: true
      })
    case (userConstants.UPDATE_PROFILE_FAILURE):

      return ({
        ...state,
        error: action.error,
        requested: true,
        profileUpdated: false
      })

    case (userConstants.UPDATE_INTERESTS_REQUEST):
      return ({
        ...state
      })
    case (userConstants.UPDATE_INTERESTS_SUCCESS):
      if (state.self)
        state.self = action.data.content
      return ({
        ...state,
        requested: true,
        interestsUpdated: true
      })
    case (userConstants.UPDATE_INTERESTS_FAILURE):
      return ({
        ...state,
        error: action.error,
        requested: true,
        interestsUpdated: false
      })

    case (userConstants.UPDATE_COORDS_REQUEST):
      return ({
        ...state
      })
    case (userConstants.UPDATE_COORDS_SUCCESS):
      if (state.self)
        state.self = action.data.content
      return ({
        ...state,
        requested: true,
        coordsUpdated: true
      })
    case (userConstants.UPDATE_COORDS_FAILURE):
      return ({
        ...state,
        error: action.error,
        requested: true,
        coordsUpdated: false
      })

    case (userConstants.UPDATE_PROFILE_PHOTO_REQUEST):
      return ({
        ...state
      })
    case (userConstants.UPDATE_PROFILE_PHOTO_SUCCESS):
      if (state.self)
        state.self.photos = action.data.content
      return ({
        ...state,
        requested: true,
        profilePhotoUpdated: true
      })
    case (userConstants.UPDATE_PROFILE_PHOTO_FAILURE):
      return ({
        ...state,
        error: action.error,
        requested: true,
        profilePhotoUpdated: false
      })

    case (userConstants.UPDATE_PHOTOS_REQUEST):
      return ({
        ...state
      })
    case (userConstants.UPDATE_PHOTOS_SUCCESS):
      if (state.self)
        state.self.photos = action.data.content
      return ({
        ...state,
        requested: true,
        photosUpdated: true
      })
    case (userConstants.UPDATE_PHOTOS_FAILURE):
      return ({
        ...state,
        error: action.error,
        requested: true,
        photosUpdated: false
      })

    /*
    ** Default
    */

    default:
      return ({
        ...state
      })
  }
}


export interface EventbriteOrganization {
    _type: string,
    name: string,
    vertical: string,
    parent_id: string,
    locale: string,
    image_id?: string,
    id: string
  }
  
  export interface EventbriteProfile {
  emails: {email: string, verified: boolean, primary: boolean}[],
  id: string,
  name: string,
  first_name: string,
  last_name: string,
  is_public: boolean,
  image_id: string
  }
  
  export interface EventbriteEvent {
      name: {
          text: string,
          html: string
      },
      description: {
          text: string,
          html: string
      },
      url: string,
      start: {
          timezone: string,
          local: Date,
          utc: Date
      },
      end: {
          timezone: string,
          local: Date,
          utc: Date
      },
      organization_id: string,
      created: Date,
      changed: Date,
      published: Date,
      capacity: number,
      capacity_is_custom: boolean,
      status: string,
      currency: string,
      listed: boolean,
      shareable: boolean,
      invite_only: boolean,
      online_event: boolean,
      show_remaining: boolean,
      tx_time_limit: number,
      hide_start_date: boolean,
      hide_end_date: boolean,
      locale: string,
      is_locked: boolean,
      privacy_setting: string,
      is_series: boolean,
      is_series_parent: boolean,
      inventory_type: string,
      is_reserved_seating: boolean,
      show_pick_a_seat: boolean,
      show_seatmap_thumbnail: boolean,
      show_colors_in_seatmap_thumbnail: boolean,
      source: string,
      is_free: boolean,
      version: any,
      summary: string,
      facebook_event_id: string,
      logo_id: string,
      organizer_id: string,
      venue_id: string,
      venue: Venue,
      category_id: string,
      subcategory_id: string,
      format_id: string,
      id: string,
      resource_uri: string,
      is_externally_ticketed: boolean,
      logo: {
          crop_mask: {
              top_left: {
                  x: number,
                  y: number
              },
              width: number,
              height: number
          },
          original: {
              url: string,
              width: number,
              height: number
          },
          id: string,
          url: string,
          aspect_ratio: string,
          edge_color: string,
          edge_color_set: boolean
      }
  }

  export interface Venue {
    address: {
        address_1: string, 
        address_2: string, 
        city: string
        country: string
        latitude: number
        localized_address_display: string
        localized_area_display: string
        localized_multi_line_address_display: string[],
        longitude: number
        postal_code: number
        region: string
    }
    age_restriction: null
    capacity: null
    id: "102320569"
    latitude: "41.3916922"
    longitude: "2.1770861"
    name: "C/ de Bailèn, 11"
    resource_uri: "https://www.eventbriteapi.com/v3/venues/102320569/"
  }
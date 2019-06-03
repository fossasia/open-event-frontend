import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    switch (this.get('params.session_status')) {
      case 'pending':
        return this.l10n.t('Pending');
      case 'confirmed':
        return this.l10n.t('Confirmed');
      case 'accepted':
        return this.l10n.t('Accepted');
      case 'rejected':
        return this.l10n.t('Rejected');
      default:
        return this.l10n.t('Session');
    }
  },
  async model(params) {
    this.set('params', params);
    let filterOptions = [];
    if (params.session_status === 'pending') {
      filterOptions = [
        {
          and: [
            {
              name : 'state',
              op   : 'eq',
              val  : 'pending'
            },
            {
              or: [
                {
                  name : 'speakers',
                  op   : 'any',
                  val  : {
                    name : 'deleted-at',
                    op   : 'eq',
                    val  : null
                  }
                },
                {
                  name : 'speakers',
                  op   : 'eq',
                  val  : null
                }
              ]
            }  
          ]
        }
      ];
    } else if (params.session_status === 'accepted') {
      filterOptions = [
        {
          and: [
            {
              name : 'state',
              op   : 'eq',
              val  : 'accepted'
            },
            {
              or: [
                {
                  name : 'speakers',
                  op   : 'any',
                  val  : {
                    name : 'deleted-at',
                    op   : 'eq',
                    val  : null
                  }
                },
                {
                  name : 'speakers',
                  op   : 'eq',
                  val  : null
                }
              ]
            }  
          ]
        }
      ];
    } else if (params.session_status === 'rejected') {
      filterOptions = [
        {
          and: [
            {
              name : 'state',
              op   : 'eq',
              val  : 'rejected'
            },
            {
              or: [
                {
                  name : 'speakers',
                  op   : 'any',
                  val  : {
                    name : 'deleted-at',
                    op   : 'eq',
                    val  : null
                  }
                },
                {
                  name : 'speakers',
                  op   : 'eq',
                  val  : null
                }
              ]
            }  
          ]
        }
      ];
    } else if (params.session_status === 'confirmed') {
      filterOptions = [
        {
          and: [
            {
              name : 'state',
              op   : 'eq',
              val  : 'confirmed'
            },
            {
              or: [
                {
                  name : 'speakers',
                  op   : 'any',
                  val  : {
                    name : 'deleted-at',
                    op   : 'eq',
                    val  : null
                  }
                },
                {
                  name : 'speakers',
                  op   : 'eq',
                  val  : null
                }
              ]
            }  
          ]
        }
      ];
    } else {
      filterOptions = [
        {
          or: [
            {
              name : 'speakers',
              op   : 'any',
              val  : {
                name : 'deleted-at',
                op   : 'eq',
                val  : null
              }
            },
            {
              name : 'speakers',
              op   : 'eq',
              val  : null
            }
          ]
        }   
      ];
    }

    let queryObject = {
      include      : 'speakers',
      filter       : filterOptions,
      'page[size]' : 10
    };

    let store = this.modelFor('events.view');

    let data =  await store.query('sessions', queryObject);

    return {
      data,
      store,
      query      : queryObject,
      objectType : 'sessions'
    };
  },

  actions: {
    refreshRoute() {
      this.refresh();
    }
  }

});

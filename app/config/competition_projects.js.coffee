root = this
module = window.PG ||= {}
$ = jQuery

root.PG = do ( module, $ ) ->
  self = module.competitionProjects = module.competitionProjects || {}

  self.show = ->
    bindLeaderboard()
    bindCompleted()

    $(document).on 'click', '.leaderboard-tab', ->
      leaderboardUpdater()

    PG.acts.bindActs()
    PG.newProjects.bindActs()
    PG.stories.bindActivity()
    PG.stories.bindNoteComposer()
    PG.utils.bindPhotoGrid()
    PG.utils.bindRatings()

  self.completed = ->
    bindCompletedLeaderboard()
    bindCompleted()

    PG.utils.bindPhotoGrid()

  # Private
  bindCompleted = ->
    $(document).on 'click', '.js-load-all', ->
      $(@).hide()
      $('.competition-projects-leaderboard li').removeClass 'hidden'

  bindCompletedLeaderboard = ->
    $('#leaderboard-select').on 'change', ->
      val = $(@).val()
      $selectedLeaderboard = $("#js-leaderboard-#{val}")

      $('.leaderboard-container').hide()
      $selectedLeaderboard.show()

  bindLeaderboard = ->
    $(document).on 'change', '#leaderboard-type', ( e ) ->
      e.preventDefault()

      selectedLeaderboard = $(@).find(':selected').val()
      PG.env.leaderboardType = selectedLeaderboard
      leaderboardUpdater()

  leaderboardUpdater = ->
    $loader = $('.tab-content-leaderboard').find('.js-loader')

    $.ajax
      url: AppRoutes.leaderboard_projects_path(format: 'html'),
      type: 'GET',
      data:
        id: PG.env.initiativeId
        leaderboard_type: PG.env.leaderboardType
      beforeSend: ->
        $loader.fadeIn 'fast'
      success: ( result ) ->
        $loader.fadeOut 'fast'
        $('.tab-content-leaderboard').html(result)

  module

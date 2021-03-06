controllers.sqlController = function ($scope, $http, $location, loginService, datareviewFactory) {
    $scope.current = {};
    $scope.current.sqlrun = '';
    $scope.current.sqlresults = '';
    $scope.current.recordcount = '';

    function runSql()
    {
        var data = "sql="+$scope.current.sqlrun;
        datareviewFactory.runSql(data)
            .success( function(data) {
                $sqlresults = data[0];
                $scope.current.recordcount = data[1];

                // 
                // create table header
                //
                $scope.current.sqlresultshdr = ""; 
                $.each($sqlresults, function(i, object) {
                    $scope.current.sqlresultshdr += "<tr  class='tableTitle'>"; 
                    $.each(object, function(property, value) {
                        $scope.current.sqlresultshdr += "<th>" + property + "</th>"; 
                    });
                    $scope.current.sqlresultshdr += "</tr>";
                    return false;
                });

                // 
                // create table detail
                //
                $scope.current.sqlresultsdetail = "";
                $.each($sqlresults, function(i, object) {
                    $scope.current.sqlresultsdetail += "<tr>";
                    $.each(object, function(property, value) {
                        $scope.current.sqlresultsdetail += "<td class='center-column-text'>"+value+"</td>";
                    });
                    $scope.current.sqlresultsdetail += "</tr>";
                });

                //
                // table elemenrs 
                //
                $scope.current.sqltable = "";
                $scope.current.sqltable = "<table class='table pickGameTable'>"+$scope.current.sqlresultshdr+$scope.current.sqlresultsdetail+"</table>";

                //
                // add to html
                //
                $('#sqltable').html($scope.current.sqltable);
            })
            .error( function(edata) {
                alert(edata);
            });
    }

    init();
    function init() {

        var loggedIn = loginService.isLoggedIn();
        if (!loggedIn)
        {
            // new code
            $scope.$parent.showAlert("Whoops!", "You must login in order to continue!");

            // alert ("You must login in order to continue!")
            $location.path("#home");
        }

        //
        // this is not getting called at right time for definig top offset
        // in jquery ready. So adding it here
        //
        setviewpadding();

    };

    $scope.runSql = function() {
        runSql();
    }
}

controllers.chartsController = function ($scope, $http, $location, membersFactory, chartService, loginService) {

    function displayChart()
    {
        switch ($scope.current.chartid)
        {
            case "1":
                getTeamDataChart1();

                $scope.current.showlinechart = true;
                $scope.current.showbarchart = false;
                break;

            case "2":
                getTeamDataChart2();

                $scope.current.showlinechart = true;
                $scope.current.showbarchart = false;
                break;

            case "3":
                getTeamDataChart3();

                $scope.current.showlinechart = false;
                $scope.current.showbarchart = true;
                break;

            case "4":
                getTeamDataChart4();

                $scope.current.showlinechart = false;
                $scope.current.showbarchart = true;
                break;

            case "5":
                getTeamDataChart5();

                $scope.current.showlinechart = false;
                $scope.current.showbarchart = true;
                break;

            case "6":
                getTeamDataChart6();

                $scope.current.showlinechart = false;
                $scope.current.showbarchart = true;
                break;

            case "7":
                getTeamDataChart7();

                $scope.current.showlinechart = true;
                $scope.current.showbarchart = false;
                break;

            case "8":
                getTeamDataChart8();

                $scope.current.showlinechart = false;
                $scope.current.showbarchart = true;
                break;

            default:
                $scope.current.chartid = "";
        }

    }

    function getCovid19Charts()
    {
        switch ($scope.current.chartid)
        {
            case "1":
                $scope.current.showteama = true;
                $scope.current.showteamb = true;
                $scope.current.showlinechart = false;
                $scope.current.showbarchart = false;

                $scope.current.teama = "1";
                $scope.current.teamb = "2";

                $scope.current.message = "<p>This line chart shows <span display='color:red;font-weight:800;'>reverse power rankings</span>. The two teams you pick will have a line chart built so you can compare the teams relative merits. We realized that most people tend to look at charts as the higher the line the better the score.</p><p>So we Took the power rankings (where lower is better) and subtracted 33 from all scores. What this means to you is that <span display='color:red;font-weight:800;'>the higher the charted value the better the team ranking</span>; the lower the worse! </p>";
                break;

            case "2":
                $scope.current.showteama = true;
                $scope.current.showteamb = false;
                $scope.current.showlinechart = false;
                $scope.current.showbarchart = false;

                $scope.current.teama = " ";
                $scope.current.teamb = " ";

                $scope.current.message = "<p>This line chart shows <span display='color:red;font-weight:800;'>reverse offensive and defensive rankings</span>. The team you pick will have a line chart built to show how its offensive and defensive rankings for overall, scoring, passing and rushing have changed from the beginning of the season to the current week. We realized that most people tend to look at charts as the higher the line the better the score.</p><p>So we Took these rankings (where lower is better) and subtracted 33 from all scores. What this means to you is that <span display='color:red;font-weight:800;'>the higher the line the better the ranking</span>; the lower the worse! </p>";
                break;

            case "3":
                $scope.current.showteama = true;
                $scope.current.showteamb = true;
                $scope.current.showlinechart = false;
                $scope.current.showbarchart = false;

                $scope.current.teama = "1";
                $scope.current.teamb = "2";

                $scope.current.message = "<p>This bar chart shows <span display='color:red;font-weight:800;'>reverse power rankings</span>. The two teams you pick will have a bar chart built so you can compare the teams relative merits. We realized that most people tend to look at charts as the higher the line the better the score.</p><p>So we Took the power rankings (where lower is better) and subtracted 33 from all scores. What this means to you is that <span display='color:red;font-weight:800;'>the higher the charted value the better the team ranking</span>; the lower the worse! </p>";
                break;

            case "4":
                $scope.current.showteama = true;
                $scope.current.showteamb = false;
                $scope.current.showlinechart = false;
                $scope.current.showbarchart = false;

                $scope.current.teama = " ";
                $scope.current.teamb = " ";

                $scope.current.message = "<p>This bar chart shows <span display='color:red;font-weight:800;'>reverse offensive rankings</span>. The team you pick will have a bar chart built to show how its offensive rankings for overall, scoring, passing and rushing have changed from the beginning of the season to the current week. We realized that most people tend to look at charts as the higher the line the better the score.</p><p>So we Took these rankings (where lower is better) and subtracted 33 from all scores. What this means to you is that <span display='color:red;font-weight:800;'>the higher the line the better the ranking</span>; the lower the worse! </p>";
                break;

            case "5":
                $scope.current.showteama = true;
                $scope.current.showteamb = false;
                $scope.current.showlinechart = false;
                $scope.current.showbarchart = false;

                $scope.current.teama = " ";
                $scope.current.teamb = " ";

                $scope.current.message = "<p>This bar chart shows <span display='color:red;font-weight:800;'>reverse defensive rankings</span>. The team you pick will have a bar chart built to show how its defensive rankings for overall, scoring, passing and rushing have changed from the beginning of the season to the current week. We realized that most people tend to look at charts as the higher the line the better the score.</p><p>So we Took these rankings (where lower is better) and subtracted 33 from all scores. What this means to you is that <span display='color:red;font-weight:800;'>the higher the line the better the ranking</span>; the lower the worse! </p>";
                break;

            case "6":
                $scope.current.showteama = true;
                $scope.current.showteamb = true;
                $scope.current.showlinechart = false;
                $scope.current.showbarchart = false;

                $scope.current.teama = "1";
                $scope.current.teamb = "2";

                $scope.current.message = "<p>This bar chart shows <span display='color:red;font-weight:800;'>reverse offensive and defensive rankings</span>. The teams you pick will have a bar chart built to show how its offensive and defensive rankings for overall, scoring, passing and rushing for the current week. In this way you can compare the relative merits of the two teams. We realized that most people tend to look at charts as the higher the line the better the score.</p><p>So we Took these rankings (where lower is better) and subtracted 33 from all scores. What this means to you is that the higher <span display='color:red;font-weight:800;'>the line the better the ranking</span>; the lower the worse! </p>";
                break;

            case "7":
                $scope.current.showteama = true;
                $scope.current.showteamb = true;
                $scope.current.showlinechart = false;
                $scope.current.showbarchart = false;

                $scope.current.teama = "1";
                $scope.current.teamb = "2";

                $scope.current.message = "<p>This line chart shows <span display='color:red;font-weight:800;'>reverse offensive and defensive rankings</span>. The teams you pick will have a line chart built to show how its offensive and defensive rankings for overall, scoring, passing and rushing for the current week. In this way you can compare the relative merits of the two teams. We realized that most people tend to look at charts as the higher the line the better the score.</p><p>So we Took these rankings (where lower is better) and subtracted 33 from all scores. What this means to you is that the higher <span display='color:red;font-weight:800;'>the line the better the ranking</span>; the lower the worse! </p>";
                break;

            case "8":
                $scope.current.showteama = true;
                $scope.current.showteamb = false;
                $scope.current.showlinechart = false;
                $scope.current.showbarchart = false;

                $scope.current.teama = " ";
                $scope.current.teamb = " ";

                $scope.current.message = "<p>This bar chart shows <span display='color:red;font-weight:800;'>reverse offensive and defensive rankings</span>. The team you pick will have a bar chart built to show how its offensive and defensive rankings for overall, scoring, passing and rushing have changed from the beginning of the season to the current week. We realized that most people tend to look at charts as the higher the line the better the score.</p><p>So we Took these rankings (where lower is better) and subtracted 33 from all scores. What this means to you is that <span display='color:red;font-weight:800;'>the higher the line the better the ranking</span>; the lower the worse! </p>";
                break;

            default:
                $scope.current.chartid = "";
        }

        $("#chartMessage").html($scope.current.message);

    }

    function getTeamDataChart1()
    {
        var teamA = $scope.current.teamidA;
        var teamB = $scope.current.teamidB;
        var season = $scope.current.season;
        // var week = $scope.current.week;

        var q = "teamid="+teamA+"&season="+$scope.current.season;
        teamsFactory.getTeamsPowerRankings(q)
            .success( function(data) {
                $scope.teamweekranksA = data[0];

                var q = "teamid="+teamB+"&season="+$scope.current.season;
                teamsFactory.getTeamsPowerRankings(q)
                    .success( function(data) {
                        $scope.teamweekranksB = data[0];

                        $scope.powerRankingsWeeks = data[1];

                        drawChart1($scope.teamweekranksA, $scope.teamweekranksB, $scope.powerRankingsWeeks);
                    })
                    .error( function(edata) {
                        alert(edata);
                    });
                })
            .error( function(edata) {
                alert(edata);
            });
    }

    function getTeamDataChart2 ()
    {
        var teamA = $scope.current.teamidA;
        var season = $scope.current.season;
        // var week = $scope.current.week;

        var q = "teamid="+teamA+"&season="+$scope.current.season;
        teamsFactory.getTeamPowerRankings(q)
            .success( function(data) {
                $scope.pot = data[0];
                $scope.pos = data[1];
                $scope.pop = data[2];
                $scope.por = data[3];
                $scope.pdt = data[4];
                $scope.pds = data[5];
                $scope.pdp = data[6];
                $scope.pdr = data[7];

                $scope.weeks = data[8];

                drawChart2($scope.pot,
                                    $scope.pos,
                                    $scope.pop,
                                    $scope.por,
                                    $scope.pdt,
                                    $scope.pds,
                                    $scope.pdp,
                                    $scope.pdr,
                                    $scope.weeks);

                })
            .error( function(edata) {
                alert(edata);
            });
    }

    function getTeamDataChart3()
    {
        var teamA = $scope.current.teamidA;
        var teamB = $scope.current.teamidB;
        var season = $scope.current.season;
        // var week = $scope.current.week;

        var q = "teamid="+teamA+"&season="+$scope.current.season;
        teamsFactory.getTeamsPowerRankings(q)
            .success( function(data) {
                $scope.teamweekranksA = data[0];

                var q = "teamid="+teamB+"&season="+$scope.current.season;
                teamsFactory.getTeamsPowerRankings(q)
                    .success( function(data) {
                        $scope.teamweekranksB = data[0];

                        $scope.powerRankingsWeeks = data[1];

                        drawChart3($scope.teamweekranksA, $scope.teamweekranksB, $scope.powerRankingsWeeks);
                    })
                    .error( function(edata) {
                        alert(edata);
                    });
                })
            .error( function(edata) {
                alert(edata);
            });
    }

    function getTeamDataChart4 ()
    {
        var teamA = $scope.current.teamidA;
        var season = $scope.current.season;
        // var week = $scope.current.week;

        var q = "teamid="+teamA+"&season="+$scope.current.season;
        teamsFactory.getTeamPowerRankings(q)
            .success( function(data) {
                $scope.pot = data[0];
                $scope.pos = data[1];
                $scope.pop = data[2];
                $scope.por = data[3];
                $scope.pdt = data[4];
                $scope.pds = data[5];
                $scope.pdp = data[6];
                $scope.pdr = data[7];

                $scope.weeks = data[8];

                drawChart4($scope.pot,
                            $scope.pos,
                            $scope.pop,
                            $scope.por,
                            $scope.weeks);

                })
            .error( function(edata) {
                alert(edata);
            });
    }

    function getTeamDataChart5 ()
    {
        var teamA = $scope.current.teamidA;
        var season = $scope.current.season;
        // var week = $scope.current.week;

        var q = "teamid="+teamA+"&season="+$scope.current.season;
        teamsFactory.getTeamPowerRankings(q)
            .success( function(data) {
                $scope.pot = data[0];
                $scope.pos = data[1];
                $scope.pop = data[2];
                $scope.por = data[3];
                $scope.pdt = data[4];
                $scope.pds = data[5];
                $scope.pdp = data[6];
                $scope.pdr = data[7];

                $scope.weeks = data[8];

                drawChart5($scope.pdt,
                            $scope.pds,
                            $scope.pdp,
                            $scope.pdr,
                            $scope.weeks);

                })
            .error( function(edata) {
                alert(edata);
            });
    }

    function getTeamDataChart6 ()
    {
        var teamA = $scope.current.teamidA;
        var teamB = $scope.current.teamidB;
        var season = $scope.current.season;
        // var week = $scope.current.week;

        var q = "teamid="+teamA+"&season="+$scope.current.season;
        teamsFactory.getTeamsStatsCurrentWeek(q)
            .success( function(data) {
                $scope.teamApot = data[0];
                $scope.teamApos = data[1];
                $scope.teamApop = data[2];
                $scope.teamApor = data[3];
                $scope.teamApdt = data[4];
                $scope.teamApds = data[5];
                $scope.teamApdp = data[6];
                $scope.teamApdr = data[7];

                var q = "teamid="+teamB+"&season="+$scope.current.season;
                teamsFactory.getTeamsStatsCurrentWeek(q)
                    .success( function(data) {
                        $scope.teamBpot = data[0];
                        $scope.teamBpos = data[1];
                        $scope.teamBpop = data[2];
                        $scope.teamBpor = data[3];
                        $scope.teamBpdt = data[4];
                        $scope.teamBpds = data[5];
                        $scope.teamBpdp = data[6];
                        $scope.teamBpdr = data[7];

                        drawChart6();
                    })
                    .error( function(edata) {
                        alert(edata);
                    });
                })
            .error( function(edata) {
                alert(edata);
            });
    }

    function getTeamDataChart7 ()
    {
        var teamA = $scope.current.teamidA;
        var teamB = $scope.current.teamidB;
        var season = $scope.current.season;
        // var week = $scope.current.week;

        var q = "teamid="+teamA+"&season="+$scope.current.season;
        teamsFactory.getTeamsStatsCurrentWeek(q)
            .success( function(data) {
                $scope.teamApot = data[0];
                $scope.teamApos = data[1];
                $scope.teamApop = data[2];
                $scope.teamApor = data[3];
                $scope.teamApdt = data[4];
                $scope.teamApds = data[5];
                $scope.teamApdp = data[6];
                $scope.teamApdr = data[7];

                var q = "teamid="+teamB+"&season="+$scope.current.season;
                teamsFactory.getTeamsStatsCurrentWeek(q)
                    .success( function(data) {
                        $scope.teamBpot = data[0];
                        $scope.teamBpos = data[1];
                        $scope.teamBpop = data[2];
                        $scope.teamBpor = data[3];
                        $scope.teamBpdt = data[4];
                        $scope.teamBpds = data[5];
                        $scope.teamBpdp = data[6];
                        $scope.teamBpdr = data[7];

                        drawChart7();
                    })
                    .error( function(edata) {
                        alert(edata);
                    });
                })
            .error( function(edata) {
                alert(edata);
            });
    }

    function getTeamDataChart8 ()
    {
        var teamA = $scope.current.teamidA;
        var season = $scope.current.season;
        // var week = $scope.current.week;

        var q = "teamid="+teamA+"&season="+$scope.current.season;
        teamsFactory.getTeamPowerRankings(q)
            .success( function(data) {
                $scope.pot = data[0];
                $scope.pos = data[1];
                $scope.pop = data[2];
                $scope.por = data[3];
                $scope.pdt = data[4];
                $scope.pds = data[5];
                $scope.pdp = data[6];
                $scope.pdr = data[7];

                $scope.weeks = data[8];

                drawChart2($scope.pot,
                                    $scope.pos,
                                    $scope.pop,
                                    $scope.por,
                                    $scope.pdt,
                                    $scope.pds,
                                    $scope.pdp,
                                    $scope.pdr,
                                    $scope.weeks);

                })
            .error( function(edata) {
                alert(edata);
            });
    }

    function drawChart1(teamApowerRankings, teamBpowerRankings, powerRankingsWeeks)
    {
        var series1 = $( "#teamidA option:selected" ).text();
        var series2 = $( "#teamidB option:selected" ).text();

        $scope.labels = powerRankingsWeeks;
        $scope.series = [series1, series2];
        $scope.data = [
             teamApowerRankings,
             teamBpowerRankings
            ];

        $scope.colors = [
            {
                fillColor: 'rgba(47, 132, 71, 0.8)',
                strokeColor: 'rgba(47, 132, 71, 0.8)',
                highlightFill: 'rgba(47, 132, 71, 0.8)',
                highlightStroke: 'rgba(47, 132, 71, 0.8)'
            },
            {
                fillColor: 'rgba(47, 132, 71, 0.8)',
                strokeColor: 'rgba(47, 132, 71, 0.8)',
                highlightFill: 'rgba(47, 132, 71, 0.8)',
                highlightStroke: 'rgba(47, 132, 71, 0.8)'
            }];

        $scope.datasetOverride = [
                {
                    yAxisID: 'Power-Rankings'
                }
            ];

        $scope.options = {
            legend: { display: true },
            scales: {
              yAxes: [
                {
                  id: 'Power-Rankings',
                  type: 'linear',
                  display: true,
                  position: 'left',
                  ticks: {
                    max:32,
                    min:0,
                    // reverse: true,
                  }
                }
              ]
            }
        };
    }

    function drawChart2(pot,pos,pop,por,pdt,pds,pdp,pdr,weeks)
    {
        var series1 = "Off All";
        var series2 = "Off Score";
        var series3 = "Off Pass";
        var series4 = "Off Rush";
        var series5 = "Def All";
        var series6 = "Def Score";
        var series7 = "Def Pass";
        var series8 = "Def Rush";


        $scope.labels = weeks;


        $scope.series = [series1,
                    series2,
                    series3,
                    series4,
                    series5,
                    series6,
                    series7,
                    series8];

        $scope.data = [
             pot,pos,pop,por,pdt,pds,pdp,pdr
            ];

        $scope.colors = [
            {
                fillColor: 'rgba(47, 132, 71, 0.8)',
                strokeColor: 'rgba(47, 132, 71, 0.8)',
                highlightFill: 'rgba(47, 132, 71, 0.8)',
                highlightStroke: 'rgba(47, 132, 71, 0.8)'
            },
            {
                fillColor: 'rgba(47, 132, 71, 0.8)',
                strokeColor: 'rgba(47, 132, 71, 0.8)',
                highlightFill: 'rgba(47, 132, 71, 0.8)',
                highlightStroke: 'rgba(47, 132, 71, 0.8)'
            }];

        $scope.datasetOverride = [
                {
                    yAxisID: 'Power-Rankings'
                }
            ];

        $scope.options = {
            legend: { display: true },
            scales: {
              yAxes: [
                {
                  id: 'Power-Rankings',
                  type: 'linear',
                  display: true,
                  position: 'left',
                  ticks: {
                    max:32,
                    min:0
                  }

                }
              ]
            }
        };
    }

    function drawChart3(teamApowerRankings, teamBpowerRankings, powerRankingsWeeks)
    {
        var series1 = $( "#teamidA option:selected" ).text();
        var series2 = $( "#teamidB option:selected" ).text();

        $scope.labels = powerRankingsWeeks;
        $scope.series = [series1, series2];
        $scope.data = [
             teamApowerRankings,
             teamBpowerRankings
            ];

        $scope.colors = [
            {
                fillColor: 'rgba(47, 132, 71, 0.8)',
                strokeColor: 'rgba(47, 132, 71, 0.8)',
                highlightFill: 'rgba(47, 132, 71, 0.8)',
                highlightStroke: 'rgba(47, 132, 71, 0.8)'
            },
            {
                fillColor: 'rgba(47, 132, 71, 0.8)',
                strokeColor: 'rgba(47, 132, 71, 0.8)',
                highlightFill: 'rgba(47, 132, 71, 0.8)',
                highlightStroke: 'rgba(47, 132, 71, 0.8)'
            }];

        // $scope.datasetOverride = [
        //         {
        //             yAxisID: 'Power-Rankings'
        //         }
        //     ];

        $scope.options = {
            legend: { display: true },
            scales: {
              yAxes: [
                {
                  id: 'Power-Rankings',
                  type: 'linear',
                  display: true,
                  position: 'left',
                  ticks: {
                    max:32,
                    min:0,
                    // reverse: true,
                  }

                }
              ]
            }
        };

    }

    function drawChart4(pot,pos,pop,por,weeks)
    {
        var series1 = "Off All";
        var series2 = "Off Score";
        var series3 = "Off Pass";
        var series4 = "Off Rush";

        $scope.labels = weeks;

        $scope.series = [series1,
                    series2,
                    series3,
                    series4];
        $scope.data = [
             pot,pos,pop,por
            ];

        $scope.colors = [
            {
                fillColor: 'rgba(47, 132, 71, 0.8)',
                strokeColor: 'rgba(47, 132, 71, 0.8)',
                highlightFill: 'rgba(47, 132, 71, 0.8)',
                highlightStroke: 'rgba(47, 132, 71, 0.8)'
            },
            {
                fillColor: 'rgba(47, 132, 71, 0.8)',
                strokeColor: 'rgba(47, 132, 71, 0.8)',
                highlightFill: 'rgba(47, 132, 71, 0.8)',
                highlightStroke: 'rgba(47, 132, 71, 0.8)'
            }];

        // $scope.datasetOverride = [
        //         {
        //             yAxisID: 'Power-Rankings'
        //         }
        //     ];

        $scope.options = {
            legend: { display: true },
            scales: {
              yAxes: [
                {
                  id: 'Power-Rankings',
                  type: 'linear',
                  display: true,
                  position: 'left',
                  ticks: {
                    max:32,
                    min:0
                  }

                }
              ]
            }
        };
    }

    function drawChart5(pdt,pds,pdp,pdr,weeks)
    {
        var series1 = "Def All";
        var series2 = "Def Score";
        var series3 = "Def Pass";
        var series4 = "Def Rush";

        $scope.labels = weeks;

        $scope.series = [series1,
                    series2,
                    series3,
                    series4];
        $scope.data = [
             pdt,pds,pdp,pdr
            ];

        $scope.colors = [
            {
                fillColor: 'rgba(47, 132, 71, 0.8)',
                strokeColor: 'rgba(47, 132, 71, 0.8)',
                highlightFill: 'rgba(47, 132, 71, 0.8)',
                highlightStroke: 'rgba(47, 132, 71, 0.8)'
            },
            {
                fillColor: 'rgba(47, 132, 71, 0.8)',
                strokeColor: 'rgba(47, 132, 71, 0.8)',
                highlightFill: 'rgba(47, 132, 71, 0.8)',
                highlightStroke: 'rgba(47, 132, 71, 0.8)'
            }];

        // $scope.datasetOverride = [
        //         {
        //             yAxisID: 'Power-Rankings'
        //         }
        //     ];

        $scope.options = {
            legend: { display: true },
            scales: {
              yAxes: [
                {
                  id: 'Power-Rankings',
                  type: 'linear',
                  display: true,
                  position: 'left',
                  ticks: {
                    max:32,
                    min:0
                  }

                }
              ]
            }
        };
    }

    function drawChart6()
    {
        var series1 = $( "#teamidA option:selected" ).text();
        var series2 = $( "#teamidB option:selected" ).text();

        var labels1 = "Off All";
        var labels2 = "Off Score";
        var labels3 = "Off Pass";
        var labels4 = "Off Rush";
        var labels5 = "Def All";
        var labels6 = "Def Score";
        var labels7 = "Def Pass";
        var labels8 = "Def Rush";

        $scope.labels = [labels1,labels2,labels3,labels4,labels5,labels6,labels7,labels8];

        $scope.series = [series1,series2];

        $scope.data = [
                        [$scope.teamApot,
                        $scope.teamApos,
                        $scope.teamApop,
                        $scope.teamApor,
                        $scope.teamApdt,
                        $scope.teamApds,
                        $scope.teamApdp,
                        $scope.teamApdr
                        ],
                        [
                        $scope.teamBpot,
                        $scope.teamBpos,
                        $scope.teamBpop,
                        $scope.teamBpor,
                        $scope.teamBpdt,
                        $scope.teamBpds,
                        $scope.teamBpdp,
                        $scope.teamBpdr
                        ]
                    ];

        $scope.colors = [
            {
                fillColor: 'rgba(47, 132, 71, 0.8)',
                strokeColor: 'rgba(47, 132, 71, 0.8)',
                highlightFill: 'rgba(47, 132, 71, 0.8)',
                highlightStroke: 'rgba(47, 132, 71, 0.8)'
            },
            {
                fillColor: 'rgba(47, 132, 71, 0.8)',
                strokeColor: 'rgba(47, 132, 71, 0.8)',
                highlightFill: 'rgba(47, 132, 71, 0.8)',
                highlightStroke: 'rgba(47, 132, 71, 0.8)'
            }];

        // $scope.datasetOverride = [
        //         {
        //             yAxisID: 'Power-Rankings'
        //         }
        //     ];

        $scope.options = {
            legend: { display: true },
            scales: {
              yAxes: [
                {
                  id: 'Power-Rankings',
                  type: 'linear',
                  display: true,
                  position: 'left',
                  ticks: {
                    max:32,
                    min:0
                  }

                }
              ]
            }
        };
    }

    function drawChart7()
    {
        var series1 = $( "#teamidA option:selected" ).text();
        var series2 = $( "#teamidB option:selected" ).text();

        var labels1 = "Off All";
        var labels2 = "Off Score";
        var labels3 = "Off Pass";
        var labels4 = "Off Rush";
        var labels5 = "Def All";
        var labels6 = "Def Score";
        var labels7 = "Def Pass";
        var labels8 = "Def Rush";

        $scope.labels = [labels1,labels2,labels3,labels4,labels5,labels6,labels7,labels8];

        $scope.series = [series1,series2];

        $scope.data = [
                        [$scope.teamApot,
                        $scope.teamApos,
                        $scope.teamApop,
                        $scope.teamApor,
                        $scope.teamApdt,
                        $scope.teamApds,
                        $scope.teamApdp,
                        $scope.teamApdr
                        ],
                        [
                        $scope.teamBpot,
                        $scope.teamBpos,
                        $scope.teamBpop,
                        $scope.teamBpor,
                        $scope.teamBpdt,
                        $scope.teamBpds,
                        $scope.teamBpdp,
                        $scope.teamBpdr
                        ]
                    ];

        $scope.colors = [
            {
                fillColor: 'rgba(47, 132, 71, 0.8)',
                strokeColor: 'rgba(47, 132, 71, 0.8)',
                highlightFill: 'rgba(47, 132, 71, 0.8)',
                highlightStroke: 'rgba(47, 132, 71, 0.8)'
            },
            {
                fillColor: 'rgba(47, 132, 71, 0.8)',
                strokeColor: 'rgba(47, 132, 71, 0.8)',
                highlightFill: 'rgba(47, 132, 71, 0.8)',
                highlightStroke: 'rgba(47, 132, 71, 0.8)'
            }];

        // $scope.datasetOverride = [
        //         {
        //             yAxisID: 'Power-Rankings'
        //         }
        //     ];

        $scope.options = {
            legend: { display: true },
            scales: {
              yAxes: [
                {
                  id: 'Power-Rankings',
                  type: 'linear',
                  display: true,
                  position: 'left',
                  ticks: {
                    max:32,
                    min:0
                  }

                }
              ]
            }
        };
    }

    function drawChart8(pot,pos,pop,por,pdt,pds,pdp,pdr,weeks)
    {
        var series1 = "Off All";
        var series2 = "Off Score";
        var series3 = "Off Pass";
        var series4 = "Off Rush";
        var series5 = "Def All";
        var series6 = "Def Score";
        var series7 = "Def Pass";
        var series8 = "Def Rush";


        $scope.labels = weeks;


        $scope.series = [series1,
                    series2,
                    series3,
                    series4,
                    series5,
                    series6,
                    series7,
                    series8];

        $scope.data = [
             pot,pos,pop,por,pdt,pds,pdp,pdr
            ];

        $scope.colors = [
            {
                fillColor: 'rgba(47, 132, 71, 0.8)',
                strokeColor: 'rgba(47, 132, 71, 0.8)',
                highlightFill: 'rgba(47, 132, 71, 0.8)',
                highlightStroke: 'rgba(47, 132, 71, 0.8)'
            },
            {
                fillColor: 'rgba(47, 132, 71, 0.8)',
                strokeColor: 'rgba(47, 132, 71, 0.8)',
                highlightFill: 'rgba(47, 132, 71, 0.8)',
                highlightStroke: 'rgba(47, 132, 71, 0.8)'
            }];

        // $scope.datasetOverride = [
        //         {
        //             yAxisID: 'Power-Rankings'
        //         }
        //     ];

        $scope.options = {
            legend: { display: true },
            scales: {
              yAxes: [
                {
                  id: 'Power-Rankings',
                  type: 'linear',
                  display: true,
                  position: 'left',
                  ticks: {
                    max:32,
                    min:0
                  }

                }
              ]
            }
        };
    }

    init();
    function init() {
        $scope.current = {};
        $scope.current.team = {};
        $scope.current.toggleSort = "ASC";

        var loggedIn = loginService.isLoggedIn();
        if (!loggedIn)
        {
            // new code
            $scope.$parent.showAlert("Whoops!", "You must login in order to continue!");

            // alert ("You must login in order to continue!")
            $location.path("#home");
        }

        $scope.teams = "";
        $scope.current.season = "";

        // default chart is poer rankings compare
        $scope.current.chartid = "1";
        $scope.current.showteama = true;
        $scope.current.showteamb = true;
        $scope.teamstatscharts = chartService.getChartList("teamCharts");

        getCovid19Charts();

        $scope.current.memberlogin = loginService.getLogin();
        $scope.current.memberid = $scope.current.memberlogin.memberid;

        var q = "memberid="+$scope.current.memberid;
        membersFactory.getMember(q)
            .success( function(data) {
                $scope.membember = data;

                $scope.current.favoriteteamid = $scope.membember.favoriteteamid;
            })
            .error( function(edata) {
                alert(edata);
            });

        //
        // this is not getting called at right time for definig top offset
        // in jquery ready. So adding it here
        //
        setviewpadding();

    };

    $scope.getCovid19Charts = function() {
        getCovid19Charts();
    }

    $scope.displayChart = function() {
        displayChart();
    }

    $scope.onClick = function (points, evt) {
        console.log(points, evt);
    };

}
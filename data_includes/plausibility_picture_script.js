
PennController.ResetPrefix(null);
PennController.AddHost("https://github.com/aineito/PCIbex_plausibility_picture/")
PennController.DebugOff()
PennController.Sequence("welcome","demographics","instructions","plausibility_picture", "send", "final")

var showProgressBar = true;

PennController("welcome",
  newHtml("intro", "welcome_screen.html")
    .print()
    ,
  newButton("consent", "Continue")
    .settings.center()
    .print()
    .wait(
        getHtml("intro").test.complete()
            .failure( getHtml("intro").warn() ) )
    );

PennController("demographics",
  newHtml("demographics", "demographics_screen.html")
    .settings.log()
    .print()
    ,
  newButton("continue", "Continue")
    .settings.center()
    .print()
    .wait(
        getHtml("demographics").test.complete()
            .failure( getHtml("demographics").warn() ) )
    );

PennController("instructions",
  newText("heading","INSTRUCTIONS:")
     .settings.css("font-size", "24px")
     .print()
     ,
  newText("instructions","<p>In this test, you will see a sentence context and 4 pictures, "
          +"and your task is to rate how plausible each picture is to be mentioned after the context.</p>"
          +"<p>There will be many sets, so please try not to spend too much time on each picture.</p>"
          +"<p>For example, if you see the context 'The man, who is very tall, will drink...', "
          +"you may give a high rating for a picture of 'juice' or 'coffee' (because you may find it natural to say 'drink juice' or 'drink coffee'), "
          +"but a low rating for a picture of 'pizza' or 'house' (because you may find it unnatural to say 'drink pizza' or 'drink house').</p>"
          +"<p>When you click 'Continue', the browser will be full screen. Please keep it full screen until the end of the test.</p>")
     .settings.css("font-size", "20px")
     .print()
     ,
  newCanvas("empty canvas", 1, 10) // add some space
    .print()
    ,
  newButton("continue", "Continue")
    .settings.center()
    .print()
    .wait()
    ,
    newCanvas("empty canvas", 1, 10) // add some space
      .print()
      ,
      fullscreen()
    );

PennController.Template( PennController.GetTable("plausibility_picture_stimuli.csv"), // creates a template to be used for multiple trials; will use .csv in chunk_includes
                            variable =>
PennController("plausibility_picture",
    newText("reminder", "Please move the curvor and select for each picture how plausible it is to be mentioned after the given context and click 'Continue'")
        .settings.css("font-size", "18px")
        .settings.center()
        ,

   newCanvas("main_screen",  "100vw", "100vh") // place everything in this canvas
       .add("center at 50%" , "center at 5%", getText("reminder"))
       .add("center at 50%" , "center at 10%", newText("Context", variable.Context))

       .add("center at 25%" , "center at 25%", newImage("Target", variable.Target).size(200,200) )
       .add("center at 75%" , "center at 25%", newImage("English_competitor", variable.English_competitor).size(200,200) )
       .add("center at 75%" , "center at 75%", newImage("Chinese_competitor", variable.Chinese_competitor).size(200,200) )
       .add("center at 25%" , "center at 75%", newImage("Unrelated", variable.Unrelated).size(200,200) )

       .add("center at 25%" , "center at 15%", newScale("scale_Target", 100).slider() )
       .add("center at 75%" , "center at 15%", newScale("scale_English_competitor", 100).slider() )
       .add("center at 75%" , "center at 65%", newScale("scale_Chinese_competitor", 100).slider() )
       .add("center at 25%" , "center at 65%", newScale("scale_Unrelated", 100).slider() )

       .add("center at 50%" , "center at 95%", newButton("Continue", "Continue").wait())
       .print("center at 50vw" , "middle at 50vh")
       .log()
       ,

   newVar("rating_Target")
       .set(getScale("scale_Target").slider())
       .global()
       ,
   newVar("rating_English_competitor")
       .set(getScale("scale_English_competitor").slider())
       .global()
       ,
   newVar("rating_Chinese_competitor")
       .set(getScale("scale_Chinese_competitor").slider())
       .global()
       ,
   newVar("rating_Unrelated")
       .set(getScale("scale_Unrelated").slider())
       .global()
      )

    .log("Item", variable.Item) // record item ID
    .log("Condition", variable.Condition) // record item ID
    .log("Context", variable.Context) // record item ID
    .log("Target_file", variable.Target) // record image name
    .log("English_competitor_file", variable.English_competitor) // record image name
    .log("Chinese_competitor_file", variable.Chinese_competitor) // record image name
    .log("Unrelated_file", variable.Unrelated) // record image name
    .log("Rating_Target", getVar("rating_Target")) // record participants' response
    .log("Rating_English_competitor", getVar("rating_English_competitor")) // record participants' response
    .log("Rating_Chinese_competitor", getVar("rating_Chinese_competitor")) // record participants' response
    .log("Rating_Unrelated", getVar("rating_Unrelated")) // record participants' response
  );

PennController.SendResults("send")

PennController("final",
  newText("thanks","This is the end of the test.<br>Thank you for taking part!")
  .settings.center()
  .settings.css("font-size","30px")
  .print()
  ,
  newButton("void")
  .wait()
);

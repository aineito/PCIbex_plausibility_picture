
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
          +"but a low rating for a picture of 'pizza' or 'house' (because you may find it unnatural to say 'drink pizza' or 'drink house').</p>")
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
    );

PennController.Template( PennController.GetTable("plausibility_picture_stimuli.csv"), // creates a template to be used for multiple trials; will use .csv in chunk_includes
                            variable =>
PennController("plausibility_picture",
    newText("reminder", "Please select for each picture how plausible it is to be mentioned after the given context and click 'Continue'")
        .settings.css("font-size", "18px")
        .settings.center()
        .print()
        ,
   newCanvas("empty canvas", 1, 50) // add some space
       .print()
       ,
  newImage("Target", variable.Target)
      .size(200,200)
      ,
  newImage("English_competitor", variable.English_competitor)
      .size(200,200)
      ,
  newImage("Chinese_competitor", variable.Chinese_competitor)
      .size(200,200)
      ,
  newImage("Unrelated", variable.Unrelated)
     .size(200,200)
     ,
   newScale("scale_Target", "implausible", "plausible", 100)
       .slider()
       .labelsPosition("top")
       .center()
       .wait()
       ,
   newScale("scale_English_competitor", "implausible", "plausible", 100)
       .slider()
       .labelsPosition("top")
       .center()
       .wait()
       ,
   newScale("scale_Chinese_competitor", "implausible", "plausible", 100)
       .slider()
       .labelsPosition("top")
       .center()
       .wait()
       ,
   newScale("scale_Unrelated", "implausible", "plausible", 100)
       .slider()
       .labelsPosition("top")
       .center()
       .wait()
       ,
  newCanvas("pictures", 1000, 700)
     .add(150, 150, getImage("Target") )
     .add(650, 150, getImage("English_competitor") )
     .add(650, 500, getImage("Chinese_competitor") )
     .add(150, 500, getImage("Unrelated") )
     .add(150, 50, getScale("scale_Target") )
     .add(650, 50, getScale("scale_English_competitor") )
     .add(650, 400, getScale("scale_Chinese_competitor") )
     .add(150, 400, getScale("scale_Unrelated") )
     .print()
     .log()
     ,
   newVar("rating_Target")
       .set(getTextInput("scale_Target"))
       .global()
       ,
   newVar("rating_English_competitor")
       .set(getTextInput("scale_English_competitor"))
       .global()
       ,
   newVar("rating_Chinese_competitor")
       .set(getTextInput("scale_Chinese_competitor"))
       .global()
       ,
   newVar("rating_Unrelated")
       .set(getTextInput("scale_Unrelated"))
       .global()
       ,
   newButton("Continue", "Continue")
        .settings.center()
        .print()
        .wait()
        ,
    getText("reminder")
        .remove()
        ,
    getButton("Continue")
        .remove()
      )

    .log("Item", variable.Item) // record item ID
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

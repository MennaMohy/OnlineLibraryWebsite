
// array containing the details of all the books
let books =
    [
        {
            title: "A Tale of Two Cities",
            author: "Charles Dickens",
            category: "Classic Literature",
            image: "Books/tale_of_two_cities.jpg",
            borrowed: false,
            description: "As Paris burns with the fury of the oppressed, the lives of an exiled aristocrat,\n" +
                "        a selfless lawyer, and a woman caught between them collide in a storm of vengeance and redemption.\n" +
                "        From the shadow of the guillotine to the streets of London, their fates intertwine in a story of defiance,\n" +
                "        courage, and the enduring power of love."
        },
        {
            title: "It Ends With Us",
            author: "Colleen Hoover",
            category: "Contemporary Romance",
            image: "Books/it_ends_with_us.jpg",
            borrowed: false,
            description: "  A powerful and emotional novel that follows Lily Bloom as she navigates love," +
            " heartbreak,and difficult choices. When her relationship with a charming neurosurgeon begins to crack," +
            "Lily is forced to confront her past and make decisions that will shape her future. It's a story " +
            "of resilience, strength, and the complexities of love."
        },
        {
            title: "Beauty and the Beast",
            author: "Gabrielle-Suzanne Villeneuve",
            category: "Fairy Tale",
            image: "Books/beauty_and_the_beast.jpg",
            borrowed: false,
            description: " Beauty and the Beast is a timeless fairy tale that tells the story of a kind-hearted young " +
                "woman named Beauty who sacrifices her freedom to save her father. She goes to live in the enchanted " +
                "castle of a fearsome Beast, only to discover that there is more to him than meets the eye." +
                " Through compassion and inner strength, Beauty begins to uncover the magic of love and the true" +
                " meaning of beauty."
        },
        {
            title: "Maybe Someday",
            author: "Colleen Hoover",
            category: "New Adult Romance",
            image: "Books/MaybeSomeday.jpg",
            borrowed: false,
            description: "When Sydney finds comfort in her neighbor Ridge's music, their creative spark turns\n" +
                "    into something deeper. But some bonds come with consequences. Maybe Someday is a raw, emotional story about love\n" +
                "    that defies the rules."
        },
        {
            title: "Practice Makes Perfect",
            author: "Sarah Adams",
            category: "Romantic Comedy",
            image: "Books/practice-makes-perfect.jpg",
            borrowed: true,
            description: "Annie has always played it safe, until a fling with her brother's best friend\n" +
                "        makes her question everything. As sparks fly, she discovers passion can't be planned—but is this just practice,\n" +
                "        or something real?"
        },
        {
            title: "Things We Never Got Over",
            author: "Lucy Score",
            category: "Small-Town Romance",
            image: "Books/things-we-never-get-over.jpg",
            borrowed: false,
            description: "When Naomi flees her wedding to rescue her estranged twin, she lands in Knockemout,\n" +
                "    Virginia—and crashes straight into Knox, the brooding barber who hates drama. But with a niece to protect and a\n" +
                "    past that won’t let go, Naomi might just be the chaos he never saw coming."
        },
        {
            title: "Atomic Habits",
            author: "James Clear",
            category: "Self Development",
            image: "Books/atomic-habits.jpg",
            borrowed: true,
            description: "James Clear reveals how small, consistent habits compound into life-changing\n" +
                "        outcomes. Packed with science-backed strategies, this book teaches you to build good habits, break bad ones,\n" +
                "        and master the systems behind lasting success."
        },
        {
            title: "How to Win Friends And Influence People",
            author: "Dale Carnegie",
            category: "Business",
            image: "Books/how-to-inf.jpg",
            borrowed: false,
            description: "Dale Carnegie's reveals the secrets to building relationships, winning\n" +
                "        people over, and becoming a more effective communicator. Through real-life examples and practical principles,\n" +
                "        learn how to handle conflicts, inspire others, and achieve success in both business and life."
        },
        {
            title: "The Antidote",
            author: "Karen Russell",
            category: "Dark Fiction",
            image: "Books/antidote.jpg",
            borrowed: false,
            description: "When a desperate woman falls for a man whose touch is lethal, their twisted\n" +
                "        bond blurs the line between passion and poison. As their dangerous game spirals, she must choose: succumb to\n" +
                "        the toxicity or find the cure—before love becomes her last breath."
        },
        {
            title: "Fagin the Thief",
            author: "Allison Epstein",
            category: "Historical Fiction",
            image: "Books/fagain.jpg",
            borrowed: false,
            description: "In this bold retelling of Dickens' infamous villain, Fagin emerges from the\n" +
                "        shadows of Oliver Twist as a complex antihero navigating the brutal underworld of 19th-century London. Survival\n" +
                "        demands cunning, but redemption might cost everything."
        },
        {
            title: "Oliver Twist",
            author: "Charles Dickens",
            category: "Classic Literature",
            image: "Books/oliver.jpg",
            borrowed: true,
            description: "Born in a workhouse where cruelty is the only lesson, young Oliver Twist\n" +
                "        dares to ask for more. From Fagin's den of pickpockets to the terrifying grip of the violent Bill Sikes,\n" +
                "        Oliver navigates a world where poverty and crime lurk at every corner. Yet amidst the darkness, unexpected\n" +
                "        allies emerge, proving that even in the bleakest of times, hope and kindness can survive."
        },
        {
            title: "The Silent Patient",
            author: "Alex Michaelides",
            category: "Psychological Thriller",
            image: "Books/thesilentpatient.jpg",
            borrowed: true,
            description: "Alicia seemed to have the perfect life until she shot her husband five times in the face and never spoke.\n" +
                "        Confined to a psychiatric facility, her silence becomes a mystery that consumes criminal psychotherapist Theo\n" +
                "        Faber. As he delves deeper into Alicia's past, he discovers twisted secrets and unsettling parallels to his\n" +
                "        own life, leading to a revelation so explosive."
        },
        {
            title: "The Boy from the Woods",
            author: "Harlan Coben",
            category: "Mystery Thriller",
            image: "Books/theboyfromthewoods.jpg",
            borrowed: false,
            description: "Wilde was found living wild in the woods as a child with no memory of his life.\n" +
                "        Now an adult with military skills, he's drawn into danger when a teenage girl vanishes from their wealthy\n" +
                "        suburban community. As Wilde investigates, he uncovers a web of lies connecting a reality TV star, a ruthless\n" +
                "        lawyer, and shocking truths about his own mysterious past."
        },
        {
            title: "The Summer of Broken Rules",
            author: "K.L. Walther",
            category: "Teen Romance",
            image: "Books/thesummerofbrokenrules.jpg",
            borrowed: false,
            description: "Meredith escapes to her family's summer retreat, still grieving her sister's\n" +
                "        death—until the annual game of Assassin throws her together with charming groomsman Wit. As sparks fly, she must\n" +
                "        choose: protect her heart or break her own rules before summer ends."
        },
        {
            title: "The Sun is Also a Star",
            author: "Nicola Yoon",
            category: "Contemporary Romance",
            image: "Books/thesunisalsoastar.jpeg",
            borrowed: false,
            description: "Practical Natasha is being deported tonight. Dreamy Daniel believes in fate.\n" +
                "        When their paths collide in New York City, they have just 12 hours to prove love can exist between science and\n" +
                "        poetry—before Natasha's family is forced to leave the country forever."
        },
        {
            title: "Everything, Everything",
            author: "Nicola Yoon",
            category: "Contemporary Romance",
            image: "Books/everythingeverything.jpg",
            borrowed: false,
            description:"Madeline has spent her entire life sealed in a sterile home, allergic to the\n" +
                "        outside world. When charismatic Olly moves in next door, his window-side antics spark a connection that makes\n" +
                "        her question whether survival is worth living without love. Risking everything, Maddy embarks on a dangerous\n" +
                "        game of secrets and firsts—but the price of freedom might be higher than she imagined."
        },
        {
            title: "Confess",
            author: "Colleen Hoover",
            category: "New Adult Romance",
            image: "Books/confess.jpg",
            borrowed: false,
            description: "Auburn Reed needs $400 fast. When she walks into artist Owen Gentry's Dallas\n" +
                "        studio, she finds more than a paycheck—she discovers anonymous confessions turned into breathtaking paintings,\n" +
                "        and a chemistry that defies logic. But Owen has a confession of his own that could destroy everything, proving\n" +
                "        some truths are too painful to reveal."
        },
        {
            title: "Love Game",
            author: "Emma Rae",
            category: "Sports Romance",
            image: "Books/lovegame.jpg",
            borrowed: false,
            description:"Elle’s love language is food, but the culinary world hasn’t been kind—until she\n" +
                "        lands her dream role as personal chef to tennis superstar Nicky Salco. Handsome, disciplined, and totally\n" +
                "        off-limits, Nicky is everything she shouldn’t want. But when late-night hunger strikes during his grueling\n" +
                "        Wimbledon training, their kitchen rendezvous turn into something far more tempting"
        },
        {
            title: "Maybe in Another Life",
            author: "Taylor Jenkins Reid",
            category: "Contemporary Fiction",
            image: "Books/maybeinanotherlife.jpg",
            borrowed: false,
            description: "Back in LA, Hannah's reunion with her first love splits her life into parallel\n" +
                "        paths—showing how a single decision changes everything about love, loss, and finding yourself."
        },
        {
            title: "My Lovely Wife",
            author: "Samantha Downing",
            category: "Psychological Thriller",
            image: "Books/mylovelywife.jpg",
            borrowed: false,
            description: "A picture-perfect suburban couple hides a chilling secret - their marriage\n" +
                "        thrives on murder. When their carefully crafted games escalate, the line between passion and predation blurs in\n" +
                "        this shocking thriller that asks: how well do you really know your spouse?"
        },
        {
            title: "The Cheat Sheet",
            author: "Sarah Adams",
            category: "Contemporary Romance",
            image: "Books/thecheatsheet.jpg",
            borrowed: false,
            description:"Pro football star Nathan Donelson has been secretly in love with his best friend,\n" +
                "        dance studio owner Bree Camden, for years. When a viral video exposes his feelings, they strike a deal: pretend\n" +
                "        to date for one month to salvage his reputation. But as their staged romance blurs into something real, Nathan\n" +
                "        must decide whether to risk their friendship for a shot at forever."
        },
        {
            title: "The Enemy",
            author: "Sarah Adams",
            category: "Contemporary Romance",
            image: "Books/theenemy.jpg",
            borrowed: false,
            description: "Ambitious event planner Evie and laid-back musician Ryan can’t stand each\n" +
                "        other—until a forced work collaboration leads to something else. Now, with their careers on the line and tension\n" +
                "        at an all-time high, they’ll have to decide: Is this just a temporary truce, or are they playing for keeps?"
        },
        {
            title: "Verity",
            author: "Colleen Hoover",
            category: "Psychological Thriller",
            image: "Books/Verity.jpg",
            borrowed: false,
            description: "Struggling writer Lowen Ashleigh accepts a dream job: completing bestselling\n" +
                "        author Verity Crawford's popular book series after a tragic accident leaves her unable to write. But when Lowen\n" +
                "        discovers Verity's unpublished autobiography—filled with bone-chilling confessions—the line between fact and\n" +
                "        fiction blurs."
        },
        {
            title: "When In Rome",
            author: "Sarah Adams",
            category: "Romantic Comedy",
            image: "Books/wheninrome.jpg",
            borrowed: false,
            description: "When superstar Rae Rose ditches her tour for a midnight escape to Rome,\n" +
                "        Kentucky, she crashes into Noah Walker’s bakery—and his life. He’s a pie shop owner who\n" +
                "        couldn’t care less about fame; she’s a disillusioned celebrity craving normalcy. But as Rae trades stadiums for\n" +
                "        front porch swings, these opposites discover that happiness might be simpler than they thought."
        },
        {
            title: "The Housemaid",
            author: "Freida McFadden",
            category: "Psychological Thriller",
            image: "Books/Thehousemaid.jpg",
            borrowed: false,
            description:"When Millie takes a job as a live-in maid for the wealthy Winchesters, she thinks\n" +
                "        she's hit rock bottom. But behind their pristine facade lies something darker—a controlling wife, a haunted\n" +
                "        husband, and secrets that crawl through the mansion's gilded halls. As Millie uncovers the truth about the\n" +
                "        woman she replaced, she realizes the real danger isn't losing her job... it's losing her life."
        }
    ];

// Saving the array of books on the local storage
if (!localStorage.getItem('books')) {
    localStorage.setItem('books', JSON.stringify(books));
}

//Get all books
function getAllBooks() {
    return JSON.parse(localStorage.getItem("books")) || [];
}

function getBookByTitle(title) {
    // getting the book by it's title from the local storage
    const storedBooks = JSON.parse(localStorage.getItem('books')) || [];
    return storedBooks.find(book => book.title === title);
}

// Add a new book
function addBook(book) {
    const books = getAllBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
}

window.getBookByTitle = getBookByTitle;
window.addBook = addBook;
window.getAllBooks = getAllBooks;
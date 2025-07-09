 const counterRef = db.collection("visits").doc("main");

      function updateCounter() {
        if (!sessionStorage.getItem("visitorCounted")) {
          counterRef.get().then((doc) => {
            let newCount = 1;
            if (doc.exists) {
              newCount = doc.data().count + 1;
            }
            counterRef.set({ count: newCount });
            document.getElementById("visitor-counter").textContent = newCount;
            sessionStorage.setItem("visitorCounted", "true");
          }).catch((err) => {
            console.error("Visitor counter error:", err);
            document.getElementById("visitor-counter").textContent = "Offline";
          });
        } else {
          counterRef.get().then((doc) => {
            if (doc.exists) {
              document.getElementById("visitor-counter").textContent = doc.data().count;
            }
          }).catch((err) => {
            console.error("Visitor counter read error:", err);
            document.getElementById("visitor-counter").textContent = "Offline";
          });
        }
      }

      updateCounter();

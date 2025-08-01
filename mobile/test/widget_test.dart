import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:billsplit_ai/main.dart';

void main() {
  testWidgets('App should display BillSplit.ai title', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(const BillSplitApp());

    // Verify that our app displays the title.
    expect(find.text('BillSplit.ai'), findsOneWidget);
    expect(find.text('Get Started'), findsOneWidget);
    expect(find.text('Sign In'), findsOneWidget);
  });
}
